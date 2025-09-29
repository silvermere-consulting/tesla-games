import { defineCollection, z } from "astro:content";

/** Existing games collection — keep yours as-is */
const games = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    short: z.string().optional(),
    coverImage: z.string().optional(),
    tesla: z.object({
      available: z.boolean(),
      scope: z.string().optional(),
      controllerRequired: z.boolean().default(true),
      localCoop: z.boolean().default(true),
      notes: z.array(z.string()).default([]),
    }),
    platforms: z.object({
      pc: z.object({
        available: z.boolean(),
        stores: z.array(z.enum(["gmg","fanatical","gog","humble","steam","ms","epic"])).default([]),
        perks: z.array(z.string()).default([]),
      }),
      xbox: z.object({ available: z.boolean(), perks: z.array(z.string()).default([]) }),
      playstation: z.object({ available: z.boolean(), perks: z.array(z.string()).default([]) }),
      switch: z.object({ available: z.boolean(), perks: z.array(z.string()).default([]) }),
      mobile: z.object({ available: z.boolean(), perks: z.array(z.string()).default([]) }),
    }),
    saves: z.object({
      teslaExportSupported: z.boolean().default(false),
      crossSaveNotes: z.array(z.string()).default([]),
    }),
    features: z.object({
      localCoop: z.boolean().default(false),
      onlineCoopNative: z.boolean().default(false),
      onlineCoopWorkaround: z.array(z.string()).default([]),
      controllerRecommended: z.boolean().default(true),
    }),
    recommendedHardware: z.array(z.enum([
      "xbox_controller","ps5_dualsense","8bitdo_pro2","usb_c_cable","usb_hub","mobile_clip"
    ])).default([]),
    notes: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    exclude: z.boolean().default(false),
  }),
});

/** NEW: guides collection */
const guides = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    short: z.string().optional(),
    coverImage: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    tags: z.array(z.string()).default([]),
    exclude: z.boolean().default(false),
    ctas: z.array(z.object({
      label: z.string(),
      url: z.string(),
      rel: z.string().optional(),
    })).default([]),
    updated: z.string().optional(), // ISO date
  }),
});

export const collections = { games, guides };
