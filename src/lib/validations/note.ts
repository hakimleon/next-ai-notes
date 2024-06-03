import { z } from "zod";
export const createNoteSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }),
  content: z.string().optional(),
});

export type CreateNoteSchemaType = z.infer<typeof createNoteSchema>;

export const updateNoteSchema = createNoteSchema.extend({
  id: z.string(),
});

export const deleteNoteSchema = z.object({
  id: z.string(),
});
