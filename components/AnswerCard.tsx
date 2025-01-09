
import { db } from "@/lib/db";
import { FunctionComponent, RefObject } from "react";
import AnswerVoteClient from "./AnswerVote";
import { getAuthSession } from "@/lib/auth";
import EditorOutput from "./EditorOutput";
import { formatTimeToNow } from "@/utils/time";

interface AnswerCardProps {
    content : any , 
    id : string , 
    userId: string,
    createdAt : Date , 
}
 
const AnswerCard: FunctionComponent<AnswerCardProps> = async ({id,content, createdAt,userId}) => {

    const session = await getAuthSession()
     
    const user = await db.user.findFirst({
        where : { 
            id : userId 
        }, 
        
    })

    const answer = await db.answer.findFirst({ 
        where : { 
            id : id
        }, 
        include : { 
            AnswerVotes : true 
        }
    })
    

    const votesAmt = answer?.AnswerVotes.reduce((acc,{vote}) => {


        if (vote === "UP") { 
            return  acc + 1
        } else if (vote == "DOWN") { 
            return acc -1 
        }
        return acc 
    },0)


    

    const currentVote = answer?.AnswerVotes.find(({userId}) => userId === session?.user.id  )


    return ( <div className="relative  border-2 border-card p-3 flex text-center items-center gap-3" >
        <AnswerVoteClient initialVotes={votesAmt!} currentVote={currentVote?.vote} id={id} size={35} /> 
        <EditorOutput content={content} />
        <div className="flex flex-col opacity-20 items-end absolute right-3 bottom-1">
            <div>
            {formatTimeToNow(createdAt)}
            </div>
            <div>
            Answered by {user?.username}
            </div>
            
            
        </div>
    </div> );
}
 
export default AnswerCard;