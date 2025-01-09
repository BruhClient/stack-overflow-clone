"use client"

import { LanguageTags } from "@/config/tag";
import { formatTimeToNow } from "@/utils/time";
import { QuestionTag } from "@prisma/client";
import { MessageCircle, MessageCircleIcon, MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { FunctionComponent, RefObject } from "react";

interface QuestionCardProps {
    title : string , 
    author : string , 
    createdAt : Date ,
    tags? : QuestionTag[], 
    count : number , 
    id : string , 
    voteAmt: number,
}
 
const QuestionCard: FunctionComponent<QuestionCardProps> = ({id,title,author,createdAt,tags,count,voteAmt}) => {
    const router = useRouter()
    return ( <div className="card bg-card px-5 py-3 rounded-md w-full cursor-pointer hover:opacity-55 shadow-md" onClick={() => router.push(`/question/${id}`)} >
        
        <div className="lg:text-4xl md:text-3xl text-2xl">

            {title}
            
        </div>
        <div className="opacity-20 mb-2">
            <div >
                Posted by {author}
            </div>
            <div>
                {formatTimeToNow(createdAt)}
            </div>
            <div className="flex gap-2 items-center">
            {count}<MessageSquareText size={20}/>
            </div>
        </div>

        <div className="flex  justify-between items-center">
            <div className="flex flex-wrap gap-1">

            {tags?.map((tag,index) => {
                
                const found = LanguageTags.find((ltag) => tag.text === ltag.text )
                
                if (!found) { 
                    return <div key={index} className={`text-center min-w-12 text-lg} px-3 py-1 bg-foreground text-background transition-opacity duration-200 ease-in-out rounded-lg`}  >{tag.text}</div> 
                }

                return <div key={index} style={{backgroundColor:found?.color }} className={`text-center min-w-12 text-lg} px-3 py-1 text-black transition-opacity duration-200 ease-in-out rounded-lg`}  >{tag.text}</div>
            } )}

            </div>
            <div className="text-2xl flex gap-2 items-center">
                {voteAmt} {voteAmt >= 0 ? <ThumbsUp className="text-green-400"/> : <ThumbsDown className="text-red-400"/>} 
            </div>
        </div>

   
        

        
    </div> );
}
 
export default QuestionCard;