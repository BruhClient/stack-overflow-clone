"use client"

import { useToast } from "@/hooks/use-toast";
import { QuestionVoteRequest } from "@/validator/vote";
import { usePrevious } from "@mantine/hooks";
import { Vote } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FunctionComponent, useState } from "react";

interface QuestionVoteClientProps {
    initialVotes : number , 
    currentVote : Vote | undefined, 
    id : string 
}
 
const QuestionVoteClient: FunctionComponent<QuestionVoteClientProps> = ({id,initialVotes,currentVote}) => {
    

    const [voteAmt,setVoteAmt] = useState(initialVotes)
    const [vote,setVote] = useState(currentVote)
    const previousVote = usePrevious(vote);
    const previousAmt = usePrevious(voteAmt);
    const {toast} = useToast()
    const { mutate : voteQuestion} = useMutation({
        mutationFn : async (v : Vote) => { 
            
            const payload : QuestionVoteRequest = { 
                vote : v , 
                id : id
            }
            const {data} = await axios.patch("/api/question/vote",payload )

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


    return ( <div className="flex flex-col items-center absolute md:top-5 top-0 right-5">
        <ChevronUp size={40}  onClick={() => {

            
            voteQuestion("UP")
        }} className={`cursor-pointer ${vote === "UP" ? "text-green-400" : ""}`}/>
        <div className="text-xl">{voteAmt}</div>
        <ChevronDown size={40} onClick={() => {
            voteQuestion("DOWN")
        }} className={`cursor-pointer ${vote === "DOWN" ? "text-red-400" : ""}`}/> 
    </div> );
}
 
export default QuestionVoteClient;