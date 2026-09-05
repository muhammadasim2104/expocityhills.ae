export type GallerySlide = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Exterior — building renders and landscape placeholders. TODO: replace with official renders. */
export const exteriorImages: GallerySlide[] = [
  {
    src: "/assets/building-1a.webp",
    alt: "Expo City Hills 1A exterior placeholder render, Expo Hills district, Expo City Dubai",
    width: 1600,
    height: 1067,
  },
  {
    src: "/assets/building-1b.webp",
    alt: "Expo City Hills 1B exterior placeholder render, Expo Hills district, Expo City Dubai",
    width: 1600,
    height: 1067,
  },
  {
    src: "/assets/gallery-1.webp",
    alt: "Expo City Hills 1 low-rise residential community exterior, Expo Hills district, Expo City Dubai",
    width: 1600,
    height: 1067,
  },
  {
    src: "/assets/gallery-2.webp",
    alt: "Expo City Hills 1 sustainable architecture exterior, Expo City Dubai",
    width: 1600,
    height: 1067,
  },
  {
    src: "/assets/gallery-3.webp",
    alt: "Expo City Hills 1 landscaped exterior with green spaces, Expo Hills district",
    width: 1600,
    height: 1067,
  },
  {
    src: "/assets/gallery-4.webp",
    alt: "Expo City Hills 1 eco-luxury low-rise building exterior, Expo City Dubai",
    width: 1600,
    height: 1067,
  },
];

export const interiorImages: GallerySlide[] = [
  {
    src: "/assets/interior-living.webp",
    alt: "Expo City Hills 1 interior living room placeholder, Expo Hills district, Expo City Dubai",
    width: 1600,
    height: 1067,
  },
  {
    src: "/assets/interior-kitchen.webp",
    alt: "Expo City Hills 1 interior kitchen placeholder, Expo Hills district, Expo City Dubai",
    width: 1600,
    height: 1067,
  },
];

export const communityImages: GallerySlide[] = [
  {
    src: "/assets/lifestyle-pool.webp",
    alt: "Expo City Hills 1 leisure pool amenity, Expo Hills district, Expo City Dubai",
    width: 1600,
    height: 1067,
  },
  {
    src: "/assets/lifestyle-green.webp",
    alt: "Expo City Hills 1 green areas and open spaces, Expo Hills district, Expo City Dubai",
    width: 1600,
    height: 1067,
  },
  {
    src: "/assets/lifestyle-tracks.webp",
    alt: "Expo City Hills 1 jogging tracks through green space, Expo City Dubai",
    width: 1600,
    height: 1067,
  },
];

export type GalleryCategory = "exterior" | "interior" | "community";

export const gallerySliderCategories: { id: GalleryCategory; label: string }[] = [
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "community", label: "Community" },
];

export function getGalleryImages(category: GalleryCategory): GallerySlide[] {
  if (category === "exterior") return exteriorImages;
  if (category === "interior") return interiorImages;
  return communityImages;
}
