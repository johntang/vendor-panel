import { z } from "zod"

export const MediaSchema = z.object({
  id: z.string().optional(),
  url: z.string(),
  isThumbnail: z.boolean(),
  file: z.any().nullable(), // File
})

export const TopicCreateSchema = z.object({
  name: z.string().min(1),
  image: z.string().optional(),
  file: z.any().nullable(),
  media: z.array(MediaSchema).max(1).min(1),
})

export const EditProductMediaSchema = z.object({
  media: z.array(MediaSchema),
})

export const PRODUCT_CREATE_FORM_DEFAULTS: Partial<
  z.infer<typeof TopicCreateSchema>
> = {
  name: "",
  image: "",
}
