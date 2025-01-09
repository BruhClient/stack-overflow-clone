import { z } from "zod";

export const QuestionVoteValidator = z.object({ 
    id : z.string() , 
    vote : z.enum(["DOWN","UP"])

})

export type  QuestionVoteRequest = z.infer<typeof QuestionVoteValidator>

export const AnswerVoteValidator = z.object({ 
    id : z.string() , 
    vote : z.enum(["DOWN","UP"])

})

export type  AnswerVoteRequest = z.infer<typeof QuestionVoteValidator>