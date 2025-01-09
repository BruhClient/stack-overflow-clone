"use client"

import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
import { Session } from "next-auth";
import { FunctionComponent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import {useMutation} from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { UsernameRequest } from "@/validator/username";
import { useRouter } from "next/navigation";
interface UsernameModalProps {
    session:Session, 
    isOpen : boolean , 
    setOpen : Function ; 
}
 
const UsernameModal: FunctionComponent<UsernameModalProps> = ({session,isOpen,setOpen}) => {


    const router = useRouter()
    const {mutate : changeUsername} = useMutation({ 
        mutationFn : async({username} : UsernameRequest) => {

            const payload : UsernameRequest = {
                username
            }
            const {data} = await axios.patch("/api/user/username",payload)

            return data
        }, 
        onError: (error) => { 
          if (error instanceof AxiosError) { 
            if (error.response?.status ===401)  { 
              return toast({
                title: "Unauthorized",
                variant:"destructive"
              })
            }
            else { 
              return toast({
                title : "Username format is Invalid" , 
                description : "Username must be between 5 and 18 characters", 
                variant : "destructive"
              })
            }
          }
          return toast({
            title : "Something went wrong ." , 
            description : "Please try again later.", 
            variant : "destructive"
          })
          
        }, 
        onSuccess : () => { 
          toast({
            title: "Username Changed !" , 
            description : "Head to settings to see your new username"
            
        })
        
        setOpen(false)
      
        router.refresh()

        }
    })

    const {toast} = useToast()
    const [input,setInput] = useState<string>(session.user.username)


    useEffect(() => { 
        
        if (isOpen) { 
            setInput(session.user.username)
        }

        
    },[isOpen])
   

    
    return ( <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Username</DialogTitle>
          <DialogDescription>
            Make changes to your username here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value={input} className="col-span-3" onChange={(e) => setInput(e.target.value)}/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => changeUsername({username : input})}>Save changes</Button>
        </DialogFooter>
      </DialogContent> );
}
 
export default UsernameModal;