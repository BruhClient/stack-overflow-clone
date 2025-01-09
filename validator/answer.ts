import { z } from "zod";

export const AnswerValidator = z.object({
    content: z.any(), 
    id : z.string()
})

export type AnswerRequest = z.infer<typeof AnswerValidator> 