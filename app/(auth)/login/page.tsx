import Login from "@/components/modals/login";
import { FunctionComponent } from "react";

interface LoginPageProps {
    
}
 
const LoginPage: FunctionComponent<LoginPageProps> = () => {
    return ( <div className="absolute inset-x-0 top-0 flex h-full items-center justify-center"><Login /></div> );
}
 
export default LoginPage;