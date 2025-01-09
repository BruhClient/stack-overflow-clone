import { z } from "zod";

export const FeedValidator = z.object({ 
    limit : z.string() , 
    page : z.string()
})

export type FeedRequest = z.infer<typeof FeedValidator >