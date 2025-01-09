import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { AnswerVoteValidator } from "@/validator/vote"
import { z } from "zod"

export async function PATCH(req :Request) { 
    try { 

        const session = await getAuthSession()

        if (!session) { 
            return new Response("Unauthorized" , {status : 401})

        }


        const body = await req.json()

        const {id,vote} = AnswerVoteValidator.parse(body)

        const voteExist = await db.answerVote.findFirst({ 
            where : { 
                userId : session.user.id , 
                answerId : id , 
                
            }
        })

        if (!voteExist) { 
            await db.answerVote.create({ 
                data : { 
                    userId : session.user.id , 
                    answerId : id , 
                    vote : vote!
                }
            })

            return new Response("OK")
        } else { 

            if (voteExist.vote === vote) { 
                await db.answerVote.delete({ 
                    where : { 
                        userId_answerId: { 
                            userId : session.user.id , 
                            answerId : id 
                        }
                    }
                })

                return new Response("OK")
            }
            else { 
                await db.answerVote.update({ 
                    where : { 
                        userId_answerId :{
                            userId : session.user.id , 
                            answerId : id 
                        }
                    }, 
                    data : { 
                        vote : vote
                    }
                })

                return new Response("OK")
            }
        }



       
    } catch ( error ) { 
        if (error instanceof z.ZodError) { 
                    return new Response(error.message,{status : 422})
                }
        return new Response("Could not post ", {status : 500})
    }
}