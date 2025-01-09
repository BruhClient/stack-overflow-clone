import { db } from "@/lib/db"
import { FeedValidator } from "@/validator/feed"
import { z } from "zod"

export async function GET(req : Request) { 

    const url = new URL(req.url)
    try {   

         const {limit, page }= FeedValidator.parse({
            limit : url.searchParams.get("limit"),
            page : url.searchParams.get("page")
         })

         const questions = await db.question.findMany({
            take : parseInt(limit), 
            skip : ((parseInt(page) * parseInt(limit))), 
            include : { 
                _count: { select: { Answers: true } }, 
                QuestionTags : true , 
                author : true, 
                QuestionVotes : true


            }
         })

         return new Response(JSON.stringify(questions))
            
    } catch(error) { 
        if (error instanceof z.ZodError) { 
            return new Response(error.message,{status : 422})
        }
        return new Response("Feed Query Parameters incorrect ", {status : 500})
    }
}