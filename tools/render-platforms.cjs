// Icônes de plateformes (48 px, fond transparent) pour le README du profil GitHub.
// Source : simple-icons 9.21.0 (CC0), dans tools/platform-svg. Les marques restent à leurs propriétaires.
// Usage : node tools/render-platforms.cjs <dossier contenant node_modules/@playwright/test>
const { chromium } = require(process.argv[2] + "/node_modules/@playwright/test");
const fs = require("fs");
const path = require("path");
const src = path.resolve(__dirname, "platform-svg");
const out = path.resolve(__dirname, "../icons/platforms");

// Couleurs de marque ; Apple en gris pour rester lisible en thème clair comme sombre.
const platforms = {
  windows: "#0078D6",
  apple: "#A2AAAD",
  ios: "#A2AAAD",
  android: "#3DDC84",
  googlechrome: "#4285F4",
  firefoxbrowser: "#FF7139",
  microsoftedge: "#0078D7",
  safari: "#006CFF",
};

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ channel: "chrome" });
  const p = await b.newPage({ viewport: { width: 48, height: 48 } });
  for (const [name, color] of Object.entries(platforms)) {
    const svg = fs.readFileSync(path.join(src, `${name}.svg`), "utf8")
      .replace("<svg ", `<svg width="48" height="48" fill="${color}" `);
    await p.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block}</style>${svg}`);
    await p.screenshot({ path: path.join(out, `${name}.png`), omitBackground: true });
  }
  await b.close();
})();
