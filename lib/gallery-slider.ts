export type GallerySlide = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Expo Hills imagery from expocitydubai.com/en/expo-living/expo-hills/ */
export const exteriorImages: GallerySlide[] = [
  {
    src: "/assets/building-1a.webp",
    alt: "Expo Hills district render 1, Expo City Dubai",
    width: 1920,
    height: 1200,
  },
  {
    src: "/assets/building-1b.webp",
    alt: "Expo Hills district render 2, Expo City Dubai",
    width: 1920,
    height: 1200,
  },
  {
    src: "/assets/gallery-1.webp",
    alt: "Expo Hills open spaces and skyline views, Expo City Dubai",
    width: 1920,
    height: 1200,
  },
  {
    src: "/assets/gallery-2.webp",
    alt: "Expo Hills tranquil residential district, Expo City Dubai",
    width: 1920,
    height: 1200,
  },
  {
    src: "/assets/gallery-3.webp",
    alt: "Expo Hills green landscape, Expo City Dubai",
    width: 1920,
    height: 1200,
  },
  {
    src: "/assets/gallery-4.webp",
    alt: "Expo Hills low-rise living, Expo City Dubai",
    width: 1920,
    height: 1200,
  },
];

export const interiorImages: GallerySlide[] = [
  {
    src: "/assets/interior-living.webp",
    alt: "Expo Hills residential living concept, Expo City Dubai",
    width: 1920,
    height: 1200,
  },
  {
    src: "/assets/interior-kitchen.webp",
    alt: "Expo Hills residential amenity concept, Expo City Dubai",
    width: 1920,
    height: 1200,
  },
];

export const communityImages: GallerySlide[] = [
  {
    src: "/assets/lifestyle-pool.webp",
    alt: "Expo Hills leisure and outdoor amenity areas, Expo City Dubai",
    width: 1920,
    height: 1200,
  },
  {
    src: "/assets/lifestyle-green.webp",
    alt: "Expo Hills green areas and open spaces, Expo City Dubai",
    width: 1920,
    height: 1200,
  },
  {
    src: "/assets/lifestyle-tracks.webp",
    alt: "Expo Hills wadi-style landscape, Expo City Dubai",
    width: 1920,
    height: 1200,
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
