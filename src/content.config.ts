import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// May also need to update /src/types/index.d.ts when updating this file
// When updating the set of searchable collections, update collectionList in /src/pages/search.astro

const searchable = z.object({
  title: z.string(),
  description: z.string().optional(),
  autodescription: z.boolean().default(true),
  draft: z.boolean().default(false),
});

const about = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/about",
  }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

const social = z.object({
  email: z.string().optional(),
  github: z.string().optional(),
  linkedIn: z.string().optional(),
  website: z.string().optional(),
  youtube: z.string().optional(),
  googleScholar: z.string().optional()
});

const people = defineCollection({
  loader: glob({
    pattern: "**/[!_-]*.{md,mdx}",
    base: "./src/content/people",
  }),
  schema: ({ image }) =>
    searchable.extend({
      title: z.string(),
      image: image().optional().or(z.null()).transform((v) => v ?? undefined),
      imageAlt: z.string().default(""),
      startDate: z.string(),
      endDate: z.string().nullish().transform((v) => v ?? ""),
      status: z.string().nullish().transform((v) => v ?? ""),
      nextStop: z.string().nullish().transform((v) => v ?? ""),
      affiliation: z.string().nullish().transform((v) => v ?? ""),
      pronouns: z.string().nullish().transform((v) => v ?? ""),
      social: social.optional(),
    }),
});

const awards = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/awards",
  }),
  schema: searchable.extend({
    title: z.string().default("Awards"),
    awards: z.array(
      z.object({
        date: z.string(),
        title: z.string(),
        awardLink: z.string().url().optional().or(z.literal("")),
        recipient: z.string(),
        result: z.string(),
      })
    ).optional(),
  }),
});

const news = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/news",
  }),
  schema: searchable.extend({
    title: z.string(),
    news: z.array(
  z.object({
    date: z.string(),
    title: z.string(),
  })
).optional(),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**\/[^_]*.{md,mdx}", base: "./src/content/publications" }),
  schema: ({ image }) =>
    searchable.extend({
      date: z.date().optional(),
      image: image().optional(),
      imageAlt: z.string().default(""),
      venue: z.string().optional(),
      authors: z.array(z.object({
        name: z.string(),
        affiliation: z.string().optional().default(""),
        lab: z.boolean().optional().default(false),
      })).optional(),
      projectPage: z.string().url().optional(),
      projectCode: z.string().url().optional(),
      projectPdf: z.string().url().default(""),
      award: z.string().optional()
    }),
});

const home = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "./src/content/home" }),
  schema: ({ image }) =>
    z.object({
      image: image().optional(),
      imageAlt: z.string().default(""),
      title: z.string(),
      content: z.string(),
      button: z
        .object({
          label: z.string(),
          link: z.string().optional(),
        })
        .optional(),
    }),
});

const patents = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/patents",
  }),
  schema: searchable.extend({
    title: z.string().default("Patents"),
    patents: z.array(
      z.object({
        date: z.string(),
        title: z.string(),
        inventors: z.string().optional(),
        status: z.string().optional(),
        link: z.string().optional(),
      })
    ).optional(),
  }),
});

const presentations = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/presentations",
  }),
  schema: searchable.extend({
    title: z.string().default("Presentations"),
    presentations: z.array(
      z.object({
        date: z.string(),
        presenter: z.string(),
        title: z.string(),
        venue: z.string().optional(),
        location: z.string().optional(),
        link: z.string().optional(),
      })
    ).optional(),
  }),
});

const outreach = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/outreach",
  }),
  schema: searchable.extend({
    title: z.string().default("Outreach"),
    outreach: z.array(
      z.object({
        date: z.string(),
        title: z.string(),
        event: z.string().optional(),
        description: z.string().optional(),
        link: z.string().optional(),
      })
    ).optional(),
  }),
});

const announcements = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/announcements",
  }),
  schema: searchable.extend({
    title: z.string().default("Announcements"),
    announcements: z.array(
      z.object({
        active: z.boolean().default(true),
        date: z.string(),
        title: z.string(),
        text: z.string(),
        link: z.string().optional(),
      })
    ).optional(),
  }),
});

const resources = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/resources",
  }),
  schema: searchable.extend({
    title: z.string(),
    date: z.string().optional(),
  }),
});

// Export collections
export const collections = {
  about,
  people,
  awards,
  publications,
  home,
  news,
  patents,
  presentations,
  outreach,
  announcements,
  resources,
};
