import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { UsernameValidator } from "@/validator/username";
import { z } from "zod";

export async function PATCH(req : Request) { 
    try { 
        const session = await getAuthSession()
        if (!session) { 
            return new Response("Unauthorized",{status:401})

        }

        const body = await req.json()

        const {username} = UsernameValidator.parse(body)

        await db.user.update({ 
            where : { 
                id: session.user.id 
            }, 
            data :{ 
                username : username
            }
        })

        return new Response("OK")
 
    } catch(err) {
        if (err instanceof z.ZodError) { 
            return new Response(err.message, {status:422})
        } 
        
        return new Response("Could not update username", {status : 500})
    }} 