import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { AnswerValidator } from "@/validator/answer"
import { z } from "zod"

export async function POST(req : Request) { 
    try { 

        const session = await getAuthSession()
    
        if (!session) { 
            return new Response("Unauthorized" , {status : 401})
        
        }

        const body = await req.json()

        const {content,id}= AnswerValidator.parse(body)

        await db.answer.create({ 
            data : { 
                content : content , 
                questionId : id , 
                userId : session.user.id 

            }
        })

        return new Response("OK")

    } catch (error) { 
        if (error instanceof z.ZodError) { 
                    return new Response(error.message,{status : 422})
                }
                return new Response("Could not post ", {status : 500})
    }
}