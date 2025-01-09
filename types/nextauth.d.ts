import type {Session , User} from "next-auth"
import { JWT } from "next-auth/jwt"

type UserId = string 

declare module "next-auth/jwt" { 
    interface JWT { 
        id : UserId , 
        username : string | null,
        image : string | null
        

    }
}

declare module "next-auth" { 
    interface Session { 
        user : { 
            id : UserId , 
            username : string 
            image : string | null , 
            email: string ,
        }
       
    }
}