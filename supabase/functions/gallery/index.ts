import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, x-gh-token, apikey, authorization",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};
const J = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });
const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const okSlug = (s: unknown) => typeof s === "string" && /^[a-z0-9-]{1,80}$/.test(s);
const okEmail = (e: unknown) => typeof e === "string" && e.length < 255 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);
const okVisitor = (v: unknown) => typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
const txt = (s: unknown, n = 300) => (typeof s === "string" ? s.slice(0, n) : null);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const url = new URL(req.url);

  // Owner view: only someone whose GitHub token can push to the portfolio repo.
  if (req.method === "GET") {
    const t = req.headers.get("x-gh-token") || "";
    const g = await fetch("https://api.github.com/repos/jashwanthpm/jp-portfolio", {
      headers: { Authorization: "Bearer " + t, "User-Agent": "gallery-activity" },
    });
    const repo = g.ok ? await g.json() : null;
    if (!repo?.permissions?.push) return J({ error: "Not allowed" }, 403);

    // Recent activity across every gallery (notifications).
    if (url.searchParams.get("feed")) {
      const [e, d, f] = await Promise.all([
        db.from("gallery_emails").select("gallery_slug,email,visitor_id,visitor_name,phone,created_at").order("created_at", { ascending: false }).limit(60),
        db.from("gallery_events").select("gallery_slug,email,visitor_id,visitor_name,kind,file,n,created_at,resolution,set_name").order("created_at", { ascending: false }).limit(80),
        db.from("gallery_favorites").select("gallery_slug,email,visitor_id,list_name,file,created_at").order("created_at", { ascending: false }).limit(200),
      ]);
      return J({ emails: e.data || [], events: d.data || [], favorites: f.data || [] });
    }

    const slug = url.searchParams.get("slug");
    if (!okSlug(slug)) return J({ error: "Bad gallery" }, 400);
    const [e, d, f] = await Promise.all([
      db.from("gallery_emails").select("email,visitor_id,visitor_name,phone,created_at").eq("gallery_slug", slug).order("created_at", { ascending: false }).limit(2000),
      db.from("gallery_events").select("email,visitor_id,visitor_name,kind,file,n,created_at,resolution,set_name").eq("gallery_slug", slug).order("created_at", { ascending: false }).limit(5000),
      db.from("gallery_favorites").select("email,visitor_id,file,list_name,created_at").eq("gallery_slug", slug).order("created_at").limit(5000),
    ]);
    return J({ emails: e.data || [], events: d.data || [], favorites: f.data || [] });
  }

  // Visitor actions from a client gallery.
  if (req.method !== "POST") return J({ error: "Method not allowed" }, 405);
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return J({ error: "Bad request" }, 400); }
  const slug = b.slug;
  if (!okSlug(slug)) return J({ error: "Bad gallery" }, 400);
  const email = okEmail(b.email) ? (b.email as string).toLowerCase() : null;
  const visitorId = okVisitor(b.visitor_id) ? String(b.visitor_id).toLowerCase() : null;
  const visitorName = txt(b.visitor_name, 100);
  const phone = txt(b.phone, 30);
  const file = txt(b.file, 500);
  const list = txt(b.list, 80) || "My Favorites";

  switch (b.action) {
    case "email": {
      if (!visitorId) return J({ error: "Missing visitor id" }, 400);
      if (!email && !visitorName && !phone) return J({ ok: true });
      let existing = await db.from("gallery_emails").select("id").eq("gallery_slug", slug).eq("visitor_id", visitorId).limit(1);
      if (!existing.data?.length && email) {
        existing = await db.from("gallery_emails").select("id").eq("gallery_slug", slug).eq("email", email).limit(1);
      }
      const values = { gallery_slug: slug, gallery_name: txt(b.name, 200), email, visitor_id: visitorId, visitor_name: visitorName, phone, action: "gate" };
      if (existing.data?.length) await db.from("gallery_emails").update(values).eq("id", existing.data[0].id);
      else await db.from("gallery_emails").insert(values);
      return J({ ok: true });
    }
    case "download":
      await db.from("gallery_events").insert({ gallery_slug: slug, email, visitor_id: visitorId, visitor_name: visitorName, kind: "download", file, n: 1, resolution: txt(b.res, 20), set_name: txt(b.set, 100) });
      return J({ ok: true });
    case "zip":
      await db.from("gallery_events").insert({ gallery_slug: slug, email, visitor_id: visitorId, visitor_name: visitorName, kind: "zip", file, n: Math.min(Math.max(parseInt(String(b.n)) || 1, 1), 5000), resolution: txt(b.res, 20), set_name: txt(b.set, 100) });
      return J({ ok: true });
    case "fav":
      if (!visitorId || !file) return J({ error: "Missing visitor or file" }, 400);
      if (email) {
        const { data: byEmail } = await db.from("gallery_favorites").select("id").eq("gallery_slug", slug).eq("email", email).eq("list_name", list).eq("file", file).limit(1);
        if (byEmail?.length) {
          await db.from("gallery_favorites").update({ visitor_id: visitorId }).eq("id", byEmail[0].id);
          return J({ ok: true });
        }
      }
      await db.from("gallery_favorites").upsert({ gallery_slug: slug, email, visitor_id: visitorId, file, list_name: list }, { onConflict: "gallery_slug,visitor_id,list_name,file" });
      return J({ ok: true });
    case "unfav":
      if (!visitorId || !file) return J({ error: "Missing visitor or file" }, 400);
      await db.from("gallery_favorites").delete().eq("gallery_slug", slug).eq("visitor_id", visitorId).eq("list_name", list).eq("file", file);
      if (email) await db.from("gallery_favorites").delete().eq("gallery_slug", slug).eq("email", email).eq("list_name", list).eq("file", file);
      return J({ ok: true });
    case "rename":
      if (!visitorId) return J({ error: "Missing visitor" }, 400);
      await db.from("gallery_favorites").update({ list_name: list }).eq("gallery_slug", slug).eq("visitor_id", visitorId).eq("list_name", txt(b.old, 80) || "My Favorites");
      if (email) await db.from("gallery_favorites").update({ list_name: list }).eq("gallery_slug", slug).eq("email", email).eq("list_name", txt(b.old, 80) || "My Favorites");
      return J({ ok: true });
    case "dellist":
      if (!visitorId) return J({ error: "Missing visitor" }, 400);
      await db.from("gallery_favorites").delete().eq("gallery_slug", slug).eq("visitor_id", visitorId).eq("list_name", list);
      if (email) await db.from("gallery_favorites").delete().eq("gallery_slug", slug).eq("email", email).eq("list_name", list);
      return J({ ok: true });
    case "myfavs": {
      if (!visitorId && !email) return J({ items: [] });
      const rows: { file: string; list_name: string }[] = [];
      if (visitorId) {
        const { data } = await db.from("gallery_favorites").select("file,list_name").eq("gallery_slug", slug).eq("visitor_id", visitorId).order("created_at").limit(5000);
        rows.push(...(data || []));
      }
      if (email) {
        const { data } = await db.from("gallery_favorites").select("file,list_name").eq("gallery_slug", slug).eq("email", email).order("created_at").limit(5000);
        rows.push(...(data || []));
      }
      const unique = new Map(rows.map((r) => [r.list_name + "|" + r.file, { file: r.file, list: r.list_name }]));
      return J({ items: [...unique.values()] });
    }
    default:
      return J({ error: "Unknown action" }, 400);
  }
});
