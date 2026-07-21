import { defineCollection, z } from "astro:content";
export const projects = defineCollection({
    type: "data",
    schema: z.object({
        id: z.number(),
        title: z.string(),
        subtitle: z.string().optional(),
        techStack: z.array(z.string()).optional(),
        projectDuration: z.string(),
        team: z.string(),
        myParts: z.array(z.string()).optional(),
        longDescription: z.string(),
        shortDescription: z.string(),
        // TODO: Change from string to enum
        tags: z.array(z.string()),
        thumbnail: z.object({
            src: z.string(),
            alt: z.string(),
        }),
        url: z.string().optional(),
        // TODO: Change from string to enum (repository, pdf, demo, iframe, product)
        linktype: z.string().optional(),
        sections: z.array(z.object({
            title: z.string(),
            body: z.string(),
        })).optional(),
        images: z.array(z.object({
            src: z.string(),
            alt: z.string(),
        })).optional()
    }),
});