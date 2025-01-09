import { getServerSession, NextAuthOptions } from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import {nanoid} from "nanoid"

const authOptions:NextAuthOptions =  { 
    adapter : PrismaAdapter(db), 
    session: {
        strategy : "jwt"
    }, 
    secret :process.env.NEXTAUTH_SECRET,
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true ,
        }),
        GitHubProvider({
            clientId : process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
            allowDangerousEmailAccountLinking: true, 
        })
    ], 
    callbacks : { 
        async jwt({token}) {
            const user = await db.user.findFirst({
                where : { 
                    email : token.email 
                }
            })

            if (!user) { 
                return token
            }

            if (!user.username) {
                await db.user.update({ 
                    where : { 
                        id : user.id
                    }, 
                    data : { 
                        username : nanoid(10)
                    }
                })
            }


            return {
                id : user.id , 
                username : user.username , 
                image : user.image , 
                email : user.email
            }
        }, 
        async session({session,token}) { 


            
            if (token) { 
                session.user.id = token.id
                session.user.username = token.username
                session.user.image = token.image
            }



            return session
    
        }
    }
}

export default authOptions

export const getAuthSession = () => getServerSession(authOptions)