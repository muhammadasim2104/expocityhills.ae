import { DEFAULT_PROJECT_NAME, DEFAULT_PROJECT_SLUG } from "./config";

const PROJECTS: Record<string, { slug: string; name: string }> = {
  "expo-city-hills": {
    slug: "expo-city-hills",
    name: "Expo City Hills 1",
  },
  "expo-city-hills-1a": {
    slug: "expo-city-hills-1a",
    name: "Expo City Hills 1A",
  },
  "expo-city-hills-1b": {
    slug: "expo-city-hills-1b",
    name: "Expo City Hills 1B",
  },
};

const NAME_ALIASES: Array<[string, string]> = [
  ["expo city hills 1", "expo-city-hills"],
  ["expo city hills", "expo-city-hills"],
  ["expo city hills 1a", "expo-city-hills-1a"],
  ["expo city hills 1b", "expo-city-hills-1b"],
];

export function resolveProject(input?: {
  projectName?: string | null;
  projectSlug?: string | null;
}): { slug: string; name: string } {
  const slugKey = (input?.projectSlug ?? "").trim().toLowerCase();
  if (slugKey && PROJECTS[slugKey]) {
    return PROJECTS[slugKey];
  }

  const nameKey = (input?.projectName ?? "").trim().toLowerCase();
  for (const [alias, slug] of NAME_ALIASES) {
    if (nameKey === alias || nameKey.includes(alias)) {
      return PROJECTS[slug];
    }
  }

  if (input?.projectName?.trim()) {
    return {
      slug: slugKey || DEFAULT_PROJECT_SLUG,
      name: input.projectName.trim(),
    };
  }

  return {
    slug: DEFAULT_PROJECT_SLUG,
    name: DEFAULT_PROJECT_NAME,
  };
}
