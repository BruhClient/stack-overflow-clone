"use client"


import dynamic from "next/dynamic";
import { FunctionComponent } from "react";

const Output = dynamic(async () => (await import("editorjs-react-renderer")).default, 
    {
        ssr : false 
    }
)




interface EditorOutputProps {
    content: any, 
}
 



function CustomCodeRenderer ({data} : any) { 
   
    console.log(data)
    return ( 
        <pre className="bg-card rounded-md py-4 w-fit px-6 my-4 ">
            <code className="text-foreground text-sm">{data.code}</code>
        </pre>
    )
}


function CustomHeaderRenderer ({data} : any) { 
    console.log(data)
    return <div className="text-2xl ">{data.text}</div>
}

function CustomParagraphRenderer ({data} : any) { 
    console.log(data)
    return <div className="">{data.text}</div>
}
const renderers = { 
    code : CustomCodeRenderer, 
    header : CustomHeaderRenderer

}



const style = {
   
  };


const EditorOutput: FunctionComponent<EditorOutputProps> = ({content}) => {
    
    console.log(content)
    return (
        

        <div className=" flex flex-col ">
            <div>
                <Output style={style} data={content} renderers={renderers}/>
            </div>
            
        </div>
            
     );
}
 
export default EditorOutput;