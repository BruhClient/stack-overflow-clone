"use client"

import { useEffect, useRef, useState } from "react";
import Editor  from "@/components/Editor"
import { Label } from "@radix-ui/react-dropdown-menu";
import TextareaAutosize from 'react-textarea-autosize';
import { Button, buttonVariants } from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { QuestionRequest, QuestionValidator } from "@/validator/question";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Tag from "@/components/Tag";
import { LanguageTags,DifficultyTags } from "@/config/tag";
import Link from "next/link";




 
const CreateQuestionPage = () => {

    const {toast} = useToast()
    const router = useRouter()

    const [tags,setTagList] = useState<Array<string>>([])

   

    const updateTag = (isPressed : boolean,text:string) =>  {
        if (isPressed) { 
            setTagList([...tags,text])
        }
        else { 
            setTagList(tags.filter((tag) => tag !== text))
        }
    }

    
    const {mutate:createQns} = useMutation({ 
        mutationFn : async ({content,title,tags} : QuestionRequest) => {


            const payload : QuestionRequest = { 
                tags ,
                content , 
                title,
            } 
            const {data} = await axios.post("/api/question/create" ,payload)
            
            return data
            
            
        }, 
        onSuccess() { 
            toast({
                title : "Question Created !" , 
                description :"May the internet solve your queries as soon as possible"


            })

            router.push("/")
        }, 
        onError(err) { 
            console.log(err)
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

                    return 
                }
                return toast({
                    title : "Something went wrong" , 
                    description :"Payload encounted a problem", 
                    variant : "destructive"
    
    
                })
            }

            
            return toast({
                title : "Something went wrong" , 
                description :"Please try again later", 
                variant : "destructive"


            })
        }
    })
    
    
    const ref = useRef<EditorJS>()

    

    const {register, handleSubmit, formState : { errors },} = useForm<QuestionRequest>({ 
        resolver : zodResolver(QuestionValidator), 
        defaultValues : { 

            title : "" , 
            content: null, 
            tags :null
        }
        
    })

    
    const onSubmit = async  (data : QuestionRequest) => {


        const editor = await ref.current.save()
        const blocks = editor

        if (blocks.length === 0 ) { 
            return toast({
                title : "Please provide a description" , 
                description:"Show examples and possible solutions . This will increase the chances of a solution being found !", 
                variant: "destructive", 
            })
        }

        createQns({content:blocks, title : data.title, tags})

     }

     useEffect(() => {

        if (errors.title) { 
            toast({ 
                title : errors.title.message, 
                description: "Please try again" , 
                variant : "destructive"
            })
        }
  
       
     },[errors]) 
    

    return ( <form className="flex h-[93vh] p-3  flex-col xl:flex-row gap-6" onSubmit={handleSubmit(onSubmit)}>

        
        

        

        <div className="flex-1  flex  flex-col justify-center">

            <TextareaAutosize {...register("title")} className="outline-none w-full resize-none border-foreground rounded-md bg-transparent p-4 text-xl overflow-hidden md:text-4xl" placeholder="Enter your title"/>
            <Editor ref={ref}/>
        </div>
        
        

        <div className="xl:max-w-[500px] flex flex-col gap-5 justify-center ">
            
             
            <div className="flex-1 flex flex-col gap-3 justify-center items-center">
                <Label className="text-2xl pb-6">
                Use these tags to describe the problem . They are not complulsory but its highly recommended !
                </Label>
                <div className="flex flex-col gap-2">
                    <Label className="text-xl font-serif">Language Tags</Label>
                    <div className="flex gap-2 px-4 flex-wrap">
                        {
                            LanguageTags.map((tag,index) => <Tag key={`L${index}`} text={tag.text} className={`text-black`} color={tag.color} accountTagFn={updateTag}/>)
                        }

                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Label className="text-xl font-serif">Difficulty Tags</Label>
                    <div className="flex gap-2 px-4 flex-wrap">

                        {DifficultyTags.map((tag,index)=> <Tag key={`D${index}`} text={tag} className="bg-foreground text-background" accountTagFn={updateTag}/>)}


                        
                    </div>
                </div>
                
                

            </div>
            <div className="flex  items-end">

                <Button className="w-full mb-2 z-50" type="submit" >Post</Button>

            </div>
        </div>
  
    </form> );
}
 
export default CreateQuestionPage;