/**
 * Downloads placeholder photography and generates og-share.webp + favicons.
 * TODO: Replace building renders with official Dubai South Properties assets when released.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, "../public/assets");

/** Pexels — license-free placeholders until official renders are available. */
const assets = [
  { file: "hero-aerial.webp", url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=2400" },
  { file: "lifestyle-pool.webp", url: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { file: "lifestyle-green.webp", url: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { file: "lifestyle-tracks.webp", url: "https://images.pexels.com/photos/3775163/pexels-photo-3775163.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { file: "lifestyle-eco.webp", url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  // TODO — replace with official Dubai South Properties render when released
  { file: "building-1a.webp", url: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { file: "building-1b.webp", url: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { file: "gallery-1.webp", url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { file: "gallery-2.webp", url: "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { file: "gallery-3.webp", url: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { file: "gallery-4.webp", url: "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { file: "interior-living.webp", url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { file: "interior-kitchen.webp", url: "https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { file: "location-map.webp", url: "https://images.pexels.com/photos/1482803/pexels-photo-1482803.jpeg?auto=compress&cs=tinysrgb&w=1920" },
  { file: "expo-hills-district.webp", url: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1920" },
];

async function downloadWebp(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf).webp({ quality: 85 }).toFile(dest);
  console.log(`✓ ${dest.split("/").pop()}`);
}

async function createOgShare(heroPath) {
  const hero = await sharp(heroPath).resize(1200, 630, { fit: "cover" }).toBuffer();
  const overlay = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(42,48,44,0.15)"/>
          <stop offset="100%" stop-color="rgba(42,48,44,0.72)"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#g)"/>
      <text x="60" y="480" font-family="Georgia, serif" font-size="52" fill="#f7f3ec" font-weight="300">Expo City Hills 1</text>
      <text x="60" y="540" font-family="Arial, sans-serif" font-size="22" fill="#f7f3ec" opacity="0.9">Expo Hills · Expo City Dubai</text>
    </svg>
  `);
  await sharp(hero)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .webp({ quality: 88 })
    .toFile(join(assetsDir, "og-share.webp"));
  console.log("✓ og-share.webp");
}

async function createFavicons(heroPath) {
  const publicDir = join(__dirname, "../public");
  const sizes = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "apple-touch-icon.png", size: 180 },
    { name: "android-chrome-192x192.png", size: 192 },
    { name: "android-chrome-512x512.png", size: 512 },
  ];
  for (const { name, size } of sizes) {
    await sharp(heroPath).resize(size, size, { fit: "cover" }).png().toFile(join(publicDir, name));
    console.log(`✓ ${name}`);
  }
  await sharp(heroPath).resize(32, 32).png().toFile(join(publicDir, "favicon.ico"));
  console.log("✓ favicon.ico");
}

async function main() {
  await mkdir(assetsDir, { recursive: true });
  for (const { file, url } of assets) {
    await downloadWebp(url, join(assetsDir, file));
  }
  const heroPath = join(assetsDir, "hero-aerial.webp");
  await createOgShare(heroPath);
  await createFavicons(heroPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
