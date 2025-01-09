import {z} from "zod"


export const QuestionValidator = z.object({ 
    title : z.string().min(3, {message : "Title must be longer than 2 characters"} ).max(70,{message:"Title must be below 70 characters"}), 
    content: z.any(), 
    tags : z.array(z.string()).nullable()
})


export type QuestionRequest = z.infer<typeof QuestionValidator>
