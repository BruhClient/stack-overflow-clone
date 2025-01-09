"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

const SignupButton = () => { 


    const router = useRouter()


    return <Button onClick={() => {router.push("/signup")}}>Sign up</Button>
}

export default SignupButton