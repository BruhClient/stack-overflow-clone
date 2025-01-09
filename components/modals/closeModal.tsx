"use client"

import { X } from "lucide-react";
import { FunctionComponent } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CloseModalProps {
    className? : string 
}
 
const CloseModal: FunctionComponent<CloseModalProps> = ({className}) => {

    const router = useRouter()
    return ( 
        <Button size={"icon"}  variant={"ghost"} className={cn(className)} onClick={() => router.back()}><X size={10}/></Button>
        
    );
}
 
export default CloseModal;