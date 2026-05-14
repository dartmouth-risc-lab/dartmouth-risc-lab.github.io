# RISc Lab


<div align="center">
  <img src="src/assets/logos/RISClogo-whiteoutline.svg" alt="RISc Logo" style="width: 50%;"/>
</div>

---

This is the RISc Lab website, built using Atro with the [Astrogon](https://github.com/astrogon/astrogon) template.

## Features
- light/dark mode
- responsive layout
- searching for publications based on title

## Development Instructions (taken from Astrogon)

1. Fork this repository to your own GitHub account, then clone it to your local machine
2. Use Node 22: `nvm install 22` or `nvm use 22`
3. From the project directory, install Node dependencies: `npm install`
4. From the project directory, build: `npm run dev`
5. See your changes live at `http://localhost:4321`

## Adding Content
Most of everything you will need to update is in the ```src/content``` and ```src/assets``` folders. 

After you change frontmatter (especially `image:` paths) or add new entries, run `npx astro sync` or restart `npm run dev` so Astro regenerates its content asset cache (see `.astro/content-assets.mjs`).

- ```src/content``` : markdown files that contain the content
- ```src/assets``` : images in ```.webp``` format

### Assets
- carousel: images that cycle in the banner carousel on the home page
- logos: RISc lab logos, as well as funding sources and collaborators
- news: images that correspond with news articles
- people: images that correspond with people cards
- publications/teasers: teaser images

### Content
Each individual item that you want to show needs its own ```.md``` file. The astro code automatically searches for all entries inside the subfolders, assembling them into a "Collection" object of the same name as the folder. No editing of the astro components needed (unless you want to tweak the style)!

- about: the "about" snippet that is displayed under the logo and image banner carousel
- awards: entries for each award
- home: initializes the home page
- news: news entries
- people: entries for each person, organized by degree type in subfolders
- publications: entries for each publication

The easiest way to create a new item is to copy an existing ```.md``` file and replace the content inside with the new information. The ```.md``` files each start with some frontmatter, followed by the body content like so:

``` bash
---
title: "Title"
description: "this is the description"
image: "@/assets/example.webp"
otherParams:
  link: "https://github.com"
  year: "2022"
---
Content
```
If you need to see what frontmatter expects as input, you can look at the ```config.ts``` file and find the relevant collection definition. For instance, if you put the wrong type you may get an error that looks like this:

```bash
14:24:41 [ERROR] [InvalidContentEntryDataError] people → phd/janedoe data does not match collection schema.
startYear: Expected type `"string"`, received `"number"`
```

### Collections
Astro uses Collections to create groups of content that have the same structure. For example, this is the People collection definition:

```javascript
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
```
The ```loader``` tells astro to grab all ```.md``` or ```.mdx``` files that don't start with an underscore from the folder ```./src/content/people```. Then then ```schema``` defines the variables that get filled out in the frontmatter. Notice some variables are optional, or have defaults. The code can then use these variables to conditionally style things. For instance, for the People and Publication collections, if you don't provide an image then the code uses an example default image.

### Conditional Formatting

```people```
 - no ```image``` defaults to example
 - entries get sorted in *ascending* order according to ```startYear```
 - no ```endYear``` defaults to "present", otherwise gets put into alumni list

```publications```
 - no ```image``` defaults to example

```awards```
 - entries get sorted in *descending* order according to ```year```

```news```
 - entries get sorted in *descending* order by ```date```

## Changing the style
If you need to change the style, you can modify the ```.astro``` files found in the ```./components``` folder. The people, publications, awards, and news elements are all Cards that get grouped and shown in a CollectionLayout. Therefore, depending on what you want to edit you may edit either the Card or the CollectionLayout. The style mostly uses Tailwind CSS classes. 

## SEO
You may need to change the ```./public/CNAME``` and ```./public/robots.txt``` files to point to the correct domain name or hide certain routes. 

## Folder structure
``` bash
├── src
│   ├── assets
│   │   ├── carousel
│   │   ├── convert_imgs_webp.sh
│   │   ├── logos
│   │   │   ├── I-risc.webp
│   │   │   ├── R-risc.webp
│   │   │   ├── RISClogo-whiteoutline.svg
│   │   │   ├── Sc-risc.webp
│   │   │   ├── collaborators
│   │   │   └── funding
│   │   ├── news
│   │   ├── people
│   │   └── publications
│   │       └── teasers
│   ├── components
│   ├── content
│   │   ├── about
│   │   ├── awards
│   │   ├── config.ts
│   │   ├── home
│   │   ├── news
│   │   ├── people
│   │   │   ├── -index.md
│   │   │   ├── masters
│   │   │   ├── phd
│   │   │   ├── professors
│   │   │   └── undergraduates
│   │   └── publications
```

## Deploy on Dartmouth Server:

Just commit and push. Then check deployment errors on Github actions.

<!-- 
### TO CONNECT TO THE REWEB ASSESTS:
- RC Linux systems:      /dartfs/rc/lab/R/RISCLab
- Mac Finder path:  smb://dartfs.dartmouth.edu/rc/lab/R/RISCLab
- Windows UNC path:     \\dartfs.dartmouth.edu\rc\lab\R\RISCLab

### TO DEPLOY:
- Run `npm run build` to create the production build
- Copy all the files from [/dist] to the [dartfs/publish_html] folder to update the website on the dartmouth server.

## Astrogon
The original Astrogon documentation can be found in the folder ```./astrogon-docs```

## License
Astrogon is licensed under the [MIT License](LICENSE).
 -->
