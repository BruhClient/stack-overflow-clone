"use client"
import "../styles/editor.css"
import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import Header from "@editorjs/header"
import List from "@editorjs/list"
import CodeTool from '@editorjs/code';
import Table from '@editorjs/table';

interface EditorProps {
    ref : any, 
    placeholder? : string 
}
 
const Editor: FunctionComponent<EditorProps> = ({ref,placeholder="Enter your description"}) => {


   
    const initEditor = useCallback( async () => {
        

        if (!ref.current) { 
          
            const EditorJS = (await import("@editorjs/editorjs")).default
            const editor = new EditorJS({
            placeholder:placeholder, 
            /**
             * Id of Element that should contain Editor instance
             */

            

       
            holder: 'editorjs', 
            tools : {
                 
                header : Header, 
                list : List , 
                
                code: CodeTool,
                table: Table,


            } 
        }); 
            ref.current = editor
        }
        

    


    },[ref])

    useEffect(() => {

        
    
      
            initEditor()
            return () => { 
                ref.current?.destroy() 
                ref.current = undefined
            }
        
    }, [initEditor])




    return (

        
        <div id="editorjs" className="w-full flex-1 rounded-lg overflow-auto p-4" > </div>
        
        


            

    
    );
}
 
export default Editor;