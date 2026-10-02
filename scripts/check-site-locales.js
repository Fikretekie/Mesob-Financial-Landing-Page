// Compares every src/i18n/site/<lng>.json with en.json: missing keys, extra
// keys, array length mismatches and {{placeholders}} that don't match.
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "src", "i18n", "site");
const en = JSON.parse(fs.readFileSync(path.join(dir, "en.json"), "utf8"));
const vars = (s) => (typeof s === "string" ? (s.match(/\{\{\w+\}\}/g) || []).sort().join() : "");
let problems = 0;

function compare(a, b, at, lng) {
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) {
      console.log(`${lng}: ${at} array length ${a.length} vs ${Array.isArray(b) ? b.length : typeof b}`);
      problems++;
      return;
    }
    a.forEach((item, i) => compare(item, b[i], `${at}[${i}]`, lng));
  } else if (a && typeof a === "object") {
    Object.keys(a).forEach((k) => {
      if (!(k in (b || {}))) { console.log(`${lng}: missing ${at}.${k}`); problems++; }
      else compare(a[k], b[k], `${at}.${k}`, lng);
    });
    Object.keys(b || {}).forEach((k) => { if (!(k in a)) { console.log(`${lng}: extra ${at}.${k}`); problems++; } });
  } else if (vars(a) !== vars(b)) {
    console.log(`${lng}: placeholders differ at ${at}`); problems++;
  }
}

fs.readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "en.json").forEach((f) => {
  compare(en, JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")), "site", f.replace(".json", ""));
});
console.log(problems ? `${problems} problem(s)` : "All site locales match en.json");
process.exit(problems ? 1 : 0);
