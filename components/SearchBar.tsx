"use client"
  
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
import { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/useDebouse"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Prisma, Question } from "@prisma/client"
import { useRouter } from "next/navigation"
  
  export default function SearchBar() {

    const [input,setInput] = useState("")
    
    const debounceValue = useDebounce(input,1000)

    const {
      isFetching,
      data: queryResults,
      refetch,
      isFetched,
    } = useQuery({
      queryFn: async () => {
        if (!debounceValue) return []
        const { data } = await axios.get(`/api/question/search?q=${debounceValue}`)
        return data as (Question & {
          _count: Prisma.QuestionCountOutputType
        })[]
      },
      queryKey: ['search-query'],
      enabled: false,
    })


    useEffect(() => {

      refetch()
    },[debounceValue])

    const router = useRouter()
    const onSelect =  (id :string ) => { 
      router.push(`/question/${id}`)
      router.refresh
      setInput("")
    }
    return (
      
      <Command className="bg-card flex-1 relative overflow-visible max-w-[700px] z-50">
      <CommandInput placeholder="Search ..." value={input} onValueChange={(value) => setInput(value)} />
      <CommandList  className={`${input === "" ? 'opacity-0 pointer-events-none': ''}  transition-all duration-200 bg-card w-full absolute top-full`}>
        {isFetching ? <CommandEmpty>Loading..</CommandEmpty> : <CommandEmpty>No results found.</CommandEmpty>}

        <CommandGroup heading={"Questions"}>
          {queryResults?.map((question) => { 
            return <CommandItem key={question.id} onSelect={() => onSelect(question.id) }>{question.title}</CommandItem>
          })}
        </CommandGroup>
        
      </CommandList>
      </Command>
      
      
    )
  }
  