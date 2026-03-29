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
    pattern: "**\/[^_]*.{md,mdx}",
    base: "./src/content/people",
  }),
  schema: ({ image }) =>
    searchable.extend({
      title: z.string(),
      image: image().optional(),
      imageAlt: z.string().default(""),
      startYear: z.string().default("2022"), 
      endYear: z.string().default("present"),
      pronouns: z.string().optional(),
      social: social.optional()
    }),
});

const awards = defineCollection({
  loader: glob({
    pattern: "**\/[^_]*.{md,mdx}",
    base: "./src/content/awards",
  }),
  schema: ({ image }) =>
    searchable.extend({
      image: image().optional(),
      imageAlt: z.string().default(""),
      year: z.number().default(0),
      title: z.string().default(""),
      awardLink: z.string().url().optional(),
      recipient: z.string().default(""),
    }),
});

const news = defineCollection({
  loader: glob({
    pattern: "**\/[^_]*.{md,mdx}",
    base: "./src/content/news",
  }),
  schema: ({ image }) =>
    searchable.extend({
      image: image().optional(),
      imageAlt: z.string().default(""),
      title: z.string().default(""),
      link: z.string().url().optional(),
      date: z.date()
    }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**\/[^_]*.{md,mdx}", base: "./src/content/publications" }),
  schema: ({ image }) =>
    searchable.extend({
      date: z.date().optional(),
      image: image().optional(),
      imageAlt: z.string().default(""),
      authors: z.array(z.object({
        name: z.string(),
        affiliation: z.string().optional().default(""),
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

// Export collections
export const collections = {
  about,
  people,
  awards,
  publications,
  home,
  news
};
