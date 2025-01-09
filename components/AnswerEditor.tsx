"use client"

import { FunctionComponent, useRef } from "react";
import Editor from "./Editor";
import { Button, buttonVariants } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { AnswerRequest } from "@/validator/answer";
import axios, { AxiosError } from "axios";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import type EditorJS from "@editorjs/editorjs";
interface AnswerEditorProps {
    id : string
}
 
const AnswerEditor: FunctionComponent<AnswerEditorProps> = ({id}) => {

    const ref = useRef<EditorJS>(null)
    const {toast} = useToast()

    const router = useRouter()
    const {mutate : createAnswer} = useMutation({ 
        mutationFn : async ({content,id} : AnswerRequest) => { 
            const payload = { 
                content , 
                id
            }

            const data = axios.post("/api/answer/create",payload) 

            return data
        }, 
        onSuccess() { 
            toast({ 
                title : "Answer Created", 
                
            })
            ref.current?.clear()

            router.refresh()

            
        }, 
        onError(err) { 
            if (err instanceof AxiosError) { 
                if (err.response?.status === 401) { 
                    const {dismiss} = toast({
                        title : "Login required" , 
                        description :"You need to be logged in to do that.", 
                        variant : "destructive",
                        action : ( 
                            <Link className={buttonVariants({variant: "outline"})} onClick={() => dismiss()} href={"/login"}>Login</Link>
                        )
        
        
                    })
                    return toast({
                        title : "Something went wrong" , 
                        description :"Please try again later", 
                        variant : "destructive"
        
        
                    })
                }
                return toast({
                    title : "Something went wrong" , 
                    description :"Please try again later", 
                    variant : "destructive"
    
    
                })

                
            }
        }
    }) 
    const submitAnswer = async () => { 

        const value = await ref.current?.save()
        
        const blocks = value?.blocks


        if (!blocks || blocks.length === 0 ) { 
            return toast({ 
                title : "Empty Answer" ,  
                description : "Answer input cannot be blank", 
                variant : "destructive"
            })
        }

        createAnswer({content : value, id })


    }

    return ( <div className="flex flex-col gap-3">
        <div className="border-2 border-card rounded-lg ">
                    <Editor ref={ref} placeholder="Enter your answer..."/>
        
            </div>

        <Button className="max-w-40 " variant={"outline"} onClick={() => submitAnswer()}>Post Answer</Button>
    </div>
    
     );
}
 
export default AnswerEditor;