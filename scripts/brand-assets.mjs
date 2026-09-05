/**
 * Expo City Hills brand assets — flower emblem + wordmarks + favicons from expocitydubai.com.
 */
import { mkdir, copyFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const brandDir = join(__dirname, "../public/brand");
const publicDir = join(__dirname, "../public");

async function removeBlackBackground(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = Buffer.from(data);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (r < 24 && g < 24 && b < 24) {
      pixels[i + 3] = 0;
    }
  }

  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(outputPath);
}

async function createWordmark(flowerPath, variant, outName) {
  const W = 263;
  const H = 124;
  const textFill = variant === "white" ? "#ffffff" : "#3a3832";
  const flowerBuf = await sharp(flowerPath).resize(100, 100).png().toBuffer();

  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <text x="118" y="36" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="600" fill="${textFill}" letter-spacing="4">EXPO</text>
    <text x="118" y="66" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="600" fill="${textFill}" letter-spacing="4">CITY</text>
    <text x="118" y="96" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="600" fill="${textFill}" letter-spacing="4">HILLS</text>
  </svg>`;

  await sharp({
    create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: flowerBuf, left: 0, top: 12 },
      { input: Buffer.from(svg), left: 0, top: 0 },
    ])
    .png()
    .toFile(join(brandDir, outName));
}

async function writeFaviconSizes(flowerPath) {
  const sizes = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "apple-touch-icon.png", size: 180 },
    { name: "android-chrome-192x192.png", size: 192 },
    { name: "android-chrome-512x512.png", size: 512 },
  ];

  for (const { name, size } of sizes) {
    await sharp(flowerPath)
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(join(publicDir, name));
    console.log(`✓ ${name}`);
  }
}

async function main() {
  await mkdir(brandDir, { recursive: true });

  const flowerSrc = join(brandDir, "logo-flower@2x.png");
  const flowerOut = join(brandDir, "logo-flower.png");
  await removeBlackBackground(flowerSrc, flowerOut);
  console.log("✓ logo-flower.png (transparent)");

  await createWordmark(flowerOut, "dark", "logo-hills-dark.png");
  await createWordmark(flowerOut, "white", "logo-hills-white.png");
  console.log("✓ logo-hills-dark.png & logo-hills-white.png");

  const faviconSrc = join(brandDir, "favicon-source.ico");
  await copyFile(faviconSrc, join(publicDir, "favicon.ico"));
  console.log("✓ favicon.ico (Expo City Dubai source)");

  await writeFaviconSizes(flowerOut);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
