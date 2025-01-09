import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { QuestionVoteValidator } from "@/validator/vote"
import { z } from "zod"

export async function PATCH(req :Request) { 
    try { 

        const session = await getAuthSession()

        if (!session) { 
            return new Response("Unauthorized" , {status : 401})

        }


        const body = await req.json()

        const {id,vote} = QuestionVoteValidator.parse(body)

        const voteExist = await db.questionVote.findFirst({ 
            where : { 
                userId : session.user.id , 
                questionId : id , 
                
            }
        })

        if (!voteExist) { 
            await db.questionVote.create({ 
                data : { 
                    userId : session.user.id , 
                    questionId : id , 
                    vote : vote!
                }
            })

            return new Response("OK")
        } else { 

            if (voteExist.vote === vote) { 
                await db.questionVote.delete({ 
                    where : { 
                        userId_questionId : { 
                            userId : session.user.id , 
                            questionId : id 
                        }
                    }
                })

                return new Response("OK")
            }
            else { 
                await db.questionVote.update({ 
                    where : { 
                        userId_questionId :{
                            userId : session.user.id , 
                            questionId : id 
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