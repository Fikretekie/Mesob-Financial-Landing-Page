// Runs after `next build` (npm postbuild). Lists every exported page in
// out/ so the sitemap never drifts from the real routes.
const fs = require("fs");
const path = require("path");

const SITE = "https://meksova.com";
const OUT = path.join(__dirname, "..", "out");
const SKIP = new Set(["404"]);

function pages(dir, prefix = "") {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (!entry.isDirectory() || entry.name.startsWith("_") || SKIP.has(entry.name)) return [];
    const route = `${prefix}/${entry.name}`;
    const here = fs.existsSync(path.join(dir, entry.name, "index.html")) ? [`${route}/`] : [];
    return [...here, ...pages(path.join(dir, entry.name), route)];
  });
}

const priority = (route) =>
  route === "/" ? "1.0" : /^\/(for|pricing)\//.test(route) ? "0.9" : /^\/demo\//.test(route) ? "0.7" : "0.6";

const routes = ["/", ...pages(OUT)];
const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => `  <url><loc>${SITE}${route}</loc><lastmod>${today}</lastmod><priority>${priority(route)}</priority></url>`)
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(OUT, "sitemap.xml"), xml);
console.log(`sitemap.xml: ${routes.length} URLs`);
