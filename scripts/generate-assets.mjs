import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, "../public/assets");
mkdirSync(assetsDir, { recursive: true });

function svg(title, variant) {
  const palettes = {
    hero: "#0D1C14",
    "1a": "#1a3d2a",
    "1b": "#234d35",
    pool: "#122318",
    green: "#1a3d2a",
    tracks: "#0D1C14",
    eco: "#122318",
    gallery: "#0D1C14",
    district: "#071009",
    map: "#0D1C14",
  };
  const bg = palettes[variant] ?? "#0D1C14";
  const accent = "#4E9E6A";
  const light = "#d8e8dc";

  let body = `<rect width="800" height="600" fill="${bg}"/>`;

  if (["hero", "gallery"].includes(variant)) {
    body += `<g stroke="${accent}" stroke-opacity="0.15" stroke-width="1">`;
    for (let i = 0; i <= 16; i++) body += `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="600"/>`;
    for (let i = 0; i <= 12; i++) body += `<line x1="0" y1="${i * 50}" x2="800" y2="${i * 50}"/>`;
    body += `</g><circle cx="440" cy="220" r="90" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="1.5"/>`;
    body += `<path d="M0 420 L120 360 L260 390 L400 320 L540 370 L680 340 L800 380 L800 600 L0 600 Z" fill="#1a3d2a"/>`;
    body += `<path d="M0 480 L180 420 L360 450 L520 400 L680 430 L800 410 L800 600 L0 600 Z" fill="#2d6042"/>`;
  } else if (variant === "1a" || variant === "1b") {
    body += `<rect x="180" y="260" width="440" height="180" fill="${bg}" stroke="${accent}" stroke-width="2"/>`;
    for (let row = 0; row < 4; row++)
      for (let col = 0; col < 6; col++)
        body += `<rect x="${210 + col * 65}" y="${290 + row * 38}" width="50" height="28" fill="${accent}" fill-opacity="0.25"/>`;
    body += `<text x="400" y="520" text-anchor="middle" fill="${light}" font-family="Georgia,serif" font-size="28">${variant === "1a" ? "1A" : "1B"}</text>`;
  } else if (variant === "pool") {
    body += `<ellipse cx="400" cy="380" rx="220" ry="80" fill="${accent}" fill-opacity="0.35"/>`;
  } else if (variant === "green") {
    for (let i = 0; i < 8; i++)
      body += `<circle cx="${100 + i * 90}" cy="${400 - (i % 3) * 40}" r="35" fill="${accent}" fill-opacity="0.3"/>`;
  } else if (variant === "tracks") {
    body += `<path d="M80 480 Q200 360 320 400 T560 320 T720 380" stroke="${accent}" stroke-width="3" fill="none"/>`;
  } else if (variant === "eco") {
    body += `<circle cx="400" cy="300" r="120" fill="none" stroke="${accent}" stroke-width="2"/>`;
  } else if (variant === "district") {
    ["Downtown", "Business", "Hills", "Valley", "Fields"].forEach((d, i) => {
      const x = 80 + (i % 3) * 240;
      const y = 160 + Math.floor(i / 3) * 180;
      body += `<rect x="${x}" y="${y}" width="200" height="120" fill="${d === "Hills" ? accent : bg}" fill-opacity="${d === "Hills" ? 0.4 : 0.2}" stroke="${accent}" stroke-opacity="0.5"/>`;
      body += `<text x="${x + 100}" y="${y + 65}" text-anchor="middle" fill="${light}" font-size="16">${d}</text>`;
    });
  } else {
    body += `<circle cx="400" cy="300" r="12" fill="${accent}"/><text x="400" y="480" text-anchor="middle" fill="${light}" font-size="14">E77 × E311</text>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><title>${title}</title>${body}</svg>`;
}

const files = [
  ["home-hero.svg", "Expo City Hills 1 hero", "hero"],
  ["building-1a.svg", "Expo City Hills 1A", "1a"],
  ["building-1b.svg", "Expo City Hills 1B", "1b"],
  ["lifestyle-pool.svg", "Leisure Pool", "pool"],
  ["lifestyle-green.svg", "Green Areas", "green"],
  ["lifestyle-tracks.svg", "Jogging Tracks", "tracks"],
  ["lifestyle-eco.svg", "Eco Architecture", "eco"],
  ["gallery-1.svg", "Gallery 1", "gallery"],
  ["gallery-2.svg", "Gallery 2", "gallery"],
  ["gallery-3.svg", "Gallery 3", "pool"],
  ["gallery-4.svg", "Gallery 4", "eco"],
  ["expo-hills-district.svg", "Expo Hills District", "district"],
  ["location-map.svg", "Location Map", "map"],
];

for (const [name, title, variant] of files) {
  writeFileSync(join(assetsDir, name), svg(title, variant));
}
console.log(`Generated ${files.length} assets in public/assets/`);
