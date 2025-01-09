import { FunctionComponent, useState } from "react";
 



interface TagProps {
    text: string , 
    className? : string, 
    accountTagFn : Function, 
    color? : string 
}
 
const Tag: FunctionComponent<TagProps> = ({text,className,accountTagFn,color}) => {


 
    const [isPressed,setIsPressed] = useState<boolean>(false)


    
    
    
    return ( <button style={{backgroundColor: color}} type="button" className={`min-w-12 text-lg ${className} px-3 py-1 ${isPressed ? "opacity-100" : "opacity-30"} transition-opacity duration-200 ease-in-out rounded-lg`}  onClick={() => {
        setIsPressed(!isPressed)
        
        accountTagFn(!isPressed,text)
        


    } }>{text}</button> );
}
    
export default Tag;