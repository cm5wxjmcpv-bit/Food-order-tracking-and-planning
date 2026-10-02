import fs from "node:fs";
import crypto from "node:crypto";

const files = [
  "Code.gs",
  "Validation.gs",
  "Store.gs",
  "Auth.gs",
  "Audit.gs",
  "Events.gs",
  "Referrals.gs",
  "Duplicates.gs",
  "Reports.gs",
  "Addresses.gs",
  "Routing.gs",
  "Schema.gs",
  "Admin.html",
  "AdminClient.html",
  "AdminStyles.html",
  "appsscript.json",
];
const guide = fs.readFileSync("docs/apps-script-installation-guide.md", "utf8");
const blocks = files.map((name, i) => {
  const source = fs.readFileSync("apps-script/" + name, "utf8");
  const hash = crypto.createHash("sha256").update(source).digest("hex");
  const kind = name.endsWith(".gs")
    ? "javascript"
    : name.endsWith(".json")
      ? "json"
      : name === "AdminClient.html"
        ? "javascript"
        : name === "AdminStyles.html"
          ? "css"
          : "html";
  return `## File ${i + 1}: ${name}\n\nSHA-256: ${hash}\n\nCopy only the contents of this code box into the matching Apps Script file.\n\n\`\`\`${kind}\n${source}\`\`\`\n`;
});
fs.writeFileSync(
  "docs/apps-script-installation.md",
  guide + "\n\n# Complete file contents\n\n" + blocks.join("\n"),
);
console.log(
  "Generated complete installation package from 16 exact source files.",
);
