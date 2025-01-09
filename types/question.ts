import { Answer, Question, QuestionTag, QuestionVote, User } from "@prisma/client"

export type ExtendedQuestion = Question & { 
    QuestionTags : QuestionTag[] , 
    QuestionVotes : QuestionVote[]
    answers : Answer[], 
    author : User, 
    _count : { 
        Answers : number 
    }

}