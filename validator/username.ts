import {z} from "zod"

export const UsernameValidator = z.object({ 
    username : z.string().min(5).max(18)
})

export type UsernameRequest = z.infer<typeof UsernameValidator>