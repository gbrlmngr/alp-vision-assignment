import { z } from "zod";

export const schema = z
  .object({
    text: z
      .string()
      .min(1, "forms.validation-errors.min-1-char")
      .max(100, "forms.validation-errors.max-100-chars")
      .trim(),
  })
  .required();

export type TSchema = z.infer<typeof schema>;
