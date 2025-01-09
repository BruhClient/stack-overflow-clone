
import AnswerCard from "@/components/AnswerCard";
import AnswerEditor from "@/components/AnswerEditor";
import EditorOutput from "@/components/EditorOutput";
import QuestionVoteClient from "@/components/QuestionVote";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";


interface QuestionDetailPageProps {
    params : { 
        id : string 
    }
}
 
const QuestionDetailPage = async ({params} : QuestionDetailPageProps) => {
    
    const id = (await params).id
    const session = await getAuthSession()
    const question = await db.question.findFirst({
        where : {
            id : id
        }, 
        include : { 
            QuestionVotes : true , 
            Answers : true , 
        }
    })

    const votesAmt = question?.QuestionVotes.reduce((acc,{vote}) => {


        if (vote === "UP") { 
            return  acc + 1
        } else if (vote == "DOWN") { 
            return acc -1 
        }
        return acc 
    },0)


    const currentVote = question?.QuestionVotes.find(({userId}) => userId === session?.user.id  )



    
   
    return ( <div className="p-5 relative">
       
            <div className="flex">
                <div className="md:text-5xl text-4xl border-b-2 border-card pl-1 pr-10 pb-2 font-serif">{question?.title}</div>
                
            </div>

            <QuestionVoteClient initialVotes={votesAmt!} currentVote={currentVote?.vote} id={id}/>
            
            <EditorOutput content={question?.description} /> 
            
            <div className="mt-24 mb-12">
                <div className="text-2xl mb-2">
                    Your Answer
                </div>
                <AnswerEditor id={id }/> 
            </div>

            <div className="flex flex-col gap-3 mb-24">
                {question?.Answers.map(({createdAt,userId,content,id}) => {
                    return <AnswerCard key={id} createdAt={createdAt} userId={userId} content={content} id={id} />
                })}
            </div>
        
        </div>
    
  


);
}
 
export default QuestionDetailPage;