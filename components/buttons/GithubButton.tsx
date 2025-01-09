"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import {signIn} from  "next-auth/react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"


const GithubButton = () => { 

    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const {toast} = useToast()
    async function loginWithGithub() { 
        setLoading(true)
        try { 
            
            await signIn("github",{callbackUrl:"/"})
            
        } catch { 

            toast({ 
                title : "Something went wrong" , 
                description :"Please try again" , 
                variant:"destructive"
            })
        } finally { 
            setLoading(false )
        }
        

    }
    return <Button disabled={loading} className="w-full"variant={"outline"} onClick={() => loginWithGithub()}>Sign in to Github</Button>
}

export default GithubButton