import fs from "node:fs";
import vm from "node:vm";
const files = fs.readdirSync("apps-script").filter((f) => f.endsWith(".gs"));
for (const f of files)
  new vm.Script(fs.readFileSync("apps-script/" + f, "utf8"), { filename: f });
new vm.Script(fs.readFileSync("apps-script/AdminClient.html", "utf8"), {
  filename: "AdminClient",
});
for (const f of ["app.js", "admin.js", "config.js"])
  new vm.Script(fs.readFileSync(f, "utf8"), { filename: f });
JSON.parse(fs.readFileSync("apps-script/appsscript.json", "utf8"));
if (
  fs.readFileSync("styles.css", "utf8") !==
  fs.readFileSync("apps-script/AdminStyles.html", "utf8")
)
  throw new Error("Shared CSS differs");
const front = ["app.js", "admin.js", "config.js", "index.html", "admin.html"]
  .map((f) => fs.readFileSync(f, "utf8"))
  .join("\n");
if (/ADMIN_PASSWORD|ADMIN_USERNAME|mealAdminLoggedIn|AIza[\w-]+/.test(front))
  throw new Error("Unsafe frontend auth/key pattern");
console.log(
  "Syntax, manifest, shared styles and frontend credential checks passed.",
);
