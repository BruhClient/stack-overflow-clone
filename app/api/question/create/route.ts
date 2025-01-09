import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { QuestionValidator } from "@/validator/question";
import { z } from "zod";

export async function POST(req : Request) {
    try { 
        const session = await getAuthSession()

        if (!session) { 
            return new Response("Unauthorized" , {status : 401})

        }

        const body = await req.json()

        const {content,title,tags} = QuestionValidator.parse(body) 
        

        
        const {id} = await db.question.create({ 
            data :{
                description : content , 
                title : title , 
                authorId : session.user.id ,
                
            }
        })

        for (let i = 0 ; i < tags!.length ; i++) { 
            await db.questionTag.create({ 
                data : { 
                    questionId : id, 
                    text : tags![i]
                    
                }
            })

      
        }






        return new Response("OK")
    } catch (error) { 
        if (error instanceof z.ZodError) { 
            return new Response(error.message,{status : 422})
        }
        return new Response("Could not post ", {status : 500})
    }
}