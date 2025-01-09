
"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { ModeToggle } from "../ui/mode-toggle"
import LoginButton from "./LoginButton"
import SignupButton from "./SignupButton"
import { useSession } from "next-auth/react"

const QuestionButton = () => { 
    const router = useRouter()
    const { data: session } = useSession()

    return <div className="flex flex-col fixed bottom-4 right-4 gap-2 items-end z-50 ">




        <ModeToggle/>
        {!session ? (<div className="flex gap-2">
            <div className=" gap-1 flex flex-col md:hidden">
            <LoginButton />
            <SignupButton />
            </div>
        </div>) : " "}
        
       
        <Button onClick={() => router.push("/question/create") }>Ask a Question</Button>
        
        
    </div> 
}

export default QuestionButton