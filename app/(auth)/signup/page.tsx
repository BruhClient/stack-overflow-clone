
import SignUp from "@/components/modals/signup";
import { FunctionComponent } from "react";

interface SignUpPageProps {
    
}
 
const SignUpPage: FunctionComponent<SignUpPageProps> = () => {
    return ( <div className="absolute inset-x-0 top-0 flex h-full items-center justify-center"><SignUp /></div> );
}
 
export default SignUpPage;