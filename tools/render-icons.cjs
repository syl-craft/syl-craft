// Icônes 128 px (fond transparent) des applis pour le README du profil GitHub.
// Usage : node tools/render-icons.cjs <dossier contenant node_modules/@playwright/test>
const { chromium } = require(process.argv[2] + "/node_modules/@playwright/test");
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "../../..");
const out = path.resolve(__dirname, "../icons");
const dataUri = (file, type) => `data:${type};base64,${fs.readFileSync(path.join(root, file)).toString("base64")}`;

const icons = {
  dockpad: dataUri("DockPad/DockPad/app.ico", "image/x-icon"),
  cadranote: dataUri("[Chrome] Cadranote/cadranote/src/ui/logo.svg", "image/svg+xml"),
  picalite: dataUri("PicaLite/PicaLite-assets/logo/png/picalite-256.png", "image/png"),
  altervnc: dataUri("AlterVNC/AlterVNC-assets/logo/png/altervnc-256.png", "image/png"),
  mue: dataUri("Mue/Mue-assets/logo/png/mue-256.png", "image/png"),
};

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ channel: "chrome" });
  const p = await b.newPage({ viewport: { width: 128, height: 128 } });
  for (const [name, src] of Object.entries(icons)) {
    await p.setContent(`<style>html,body{margin:0;background:transparent}img{width:128px;height:128px;object-fit:contain;display:block}</style><img src="${src}">`);
    await p.waitForTimeout(150);
    await p.screenshot({ path: path.join(out, `${name}.png`), omitBackground: true });
  }
  await b.close();
})();
