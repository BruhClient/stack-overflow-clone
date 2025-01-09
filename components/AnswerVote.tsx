"use client"

import { useToast } from "@/hooks/use-toast";
import { AnswerVoteRequest } from "@/validator/vote";
import { usePrevious } from "@mantine/hooks";
import { Vote } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FunctionComponent, useState } from "react";

interface AnswerVoteClientProps {
    initialVotes : number , 
    currentVote : Vote | undefined, 
    id : string , 
    size? : number
}
 
const AnswerVoteClient: FunctionComponent<AnswerVoteClientProps> = ({id,initialVotes,currentVote,size=40}) => {
    

    const [voteAmt,setVoteAmt] = useState(initialVotes)
    const [vote,setVote] = useState(currentVote)
    const previousVote = usePrevious(vote);
    const previousAmt = usePrevious(voteAmt);
    const {toast} = useToast()
    const { mutate : voteQuestion} = useMutation({
        mutationFn : async (v : Vote) => { 
            
            const payload : AnswerVoteRequest = { 
                vote : v , 
                id : id
            }
            const {data} = await axios.patch("/api/answer/vote",payload )

            return data
        },
 
        onMutate(v : Vote) { 
            if (v === vote) { 
                setVote(undefined) 
                if (v === "UP" ) { 
                    setVoteAmt((prev) => prev-1)
                } else if (v === "DOWN") { 
                    setVoteAmt((prev) => prev+ 1)
                }
            }
            else { 
                
                if (v === "UP") { 
                    setVoteAmt((prev) => prev + (vote ? 2 : 1))
                }
                if (v === "DOWN") { 
                    setVoteAmt((prev) => prev - (vote ? 2 : 1))
                }
                setVote(v)
            }
        },
        
        onError() { 

            setVote(previousVote)
            setVoteAmt(previousAmt!)

            return toast({
                title : "Something went wrong" , 
                description : "Your vote was not registered . Please try again" , 
                variant : "destructive"
            })
        }   
    })


    return ( <div className="flex flex-col items-center ">
        <ChevronUp size={size}  onClick={() => {

            
            voteQuestion("UP")
        }} className={`cursor-pointer ${vote === "UP" ? "text-green-400" : ""}`}/>
        <div className="text-xl">{voteAmt}</div>
        <ChevronDown size={size} onClick={() => {
            voteQuestion("DOWN")
        }} className={`cursor-pointer ${vote === "DOWN" ? "text-red-400" : ""}`}/> 
    </div> );
}
 
export default AnswerVoteClient;