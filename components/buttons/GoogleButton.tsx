"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import {signIn} from  "next-auth/react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"


const GoogleButton = () => { 


    const [loading,setLoading] = useState(false)
    const {toast} = useToast()
    async function loginWithGoogle() { 
        setLoading(true)
        try { 
            
            await signIn("google",{callbackUrl:"/"})
            
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
    return <Button disabled={loading} className="w-full"variant={"outline"} onClick={() => loginWithGoogle()}>Sign in to Google</Button>
}

export default GoogleButton