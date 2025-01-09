"use client"

import { ExtendedQuestion } from "@/types/question";
import { FunctionComponent, useEffect, useRef, useState } from "react";

import {useIntersection} from "@mantine/hooks"
import { useInfiniteQuery } from "@tanstack/react-query";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import axios from "axios";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import QuestionCard from "./QuestionCard";


interface PostFeedProps {
    
    subredditName? : string,
}
 
const PostFeed: FunctionComponent<PostFeedProps> = () => {
    
    const lastPostRef = useRef<HTMLElement>(null)


    

  

    const {ref,entry} = useIntersection(
        {
            root : lastPostRef.current, 
            threshold : 1
        }
    )

    

    

    const {data,fetchNextPage,isFetchingNextPage,hasNextPage} = useInfiniteQuery({
        queryKey : ['questions'], 
        queryFn : async ({pageParam}) => {
 
            const {data} = await axios.get(`/api/question?page=${pageParam}&limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}`)
            return data as ExtendedQuestion[]
         }, 
        initialPageParam : 0 , 
        getNextPageParam : (fetchedPages,pages ) => { 
            
            if (fetchedPages.length === 0 ) { 
                return undefined
            }

          

            return pages.length 
        },    
        
    })

    const questions = data?.pages.flatMap((page) => page) ?? []
    
  
    useEffect(() => {
        
        
        if (entry?.isIntersecting && !isFetchingNextPage && hasNextPage) { 
            if (hasNextPage) { 
                fetchNextPage()
            }
            

            
        }
    },[entry])


    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
      }, []);
    
      if (!isMounted) {
        return null;
      }
      
    return ( <ResponsiveMasonry 
        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}} className="p-5 z-50" >
                <Masonry columnsCount={3} gutter="10px">

                {questions.map(({title,author,createdAt,_count,id,QuestionTags,QuestionVotes},index) => {
                    const voteAmt = QuestionVotes.reduce((acc,{vote}) => {
                        if (vote === "UP") { 
                            return acc + 1 
                        } else { 
                            return acc - 1 
                        }
                        
                    } , 0 )
                    if (index === questions.length -1) { 

                        return ( <div ref={ref} key={id}>
                            <QuestionCard id={id} key={id} title={title} author={author.username} createdAt={createdAt} count={_count.Answers} tags={QuestionTags} voteAmt={voteAmt}/>
                        </div>) 
                        
                    }   
                    return <QuestionCard id={id} key={id} title={title} author={author.username} createdAt={createdAt} count={_count.Answers} tags={QuestionTags} voteAmt={voteAmt}/>
                    })}
                </Masonry>

                    

        
    </ResponsiveMasonry> );
}
 
export default PostFeed;