"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import {
    Dialog,
    DialogTrigger,
  } from "@/components/ui/dialog"

 
import { Session } from "next-auth";
import { FunctionComponent, useState } from "react";
import { signOut } from "next-auth/react";

import UsernameModal from "./modals/username";
import { useRouter } from "next/navigation";

interface UserAvatarProps {
  session: Session  
}
 
const UserAvatar: FunctionComponent<UserAvatarProps> = ({session}) => {




    async function logout () { 
        await signOut({
            callbackUrl : "/"
        })
        router.refresh()
    }
    const router = useRouter()
    const [open,setOpen] = useState<boolean>(false)



    
    return ( <Dialog open={open} onOpenChange={setOpen}><DropdownMenu >
        <DropdownMenuTrigger asChild>
            <Avatar >
            <AvatarImage src={session.user.image ? session.user.image : undefined} alt="@shadcn" className="rounded-full w-10 "/>
            <AvatarFallback >Profile</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-3 bg-card">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>


        <div className="flex flex-col pl-3 text-sm opacity-80">
            <div>{session.user.username}</div>
            <div>{session.user.email}</div>
            
        </div>


        <DropdownMenuSeparator />
        <DropdownMenuGroup>

        <DialogTrigger className="w-full">
            <DropdownMenuItem>
                Change Username
            </DropdownMenuItem>
        </DialogTrigger>

        

          
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => logout()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>

    </DropdownMenu>

    <UsernameModal session={session} isOpen={open} setOpen={setOpen} />
    
    </Dialog> );
}
 
export default UserAvatar;