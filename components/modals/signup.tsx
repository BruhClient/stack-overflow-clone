
import GoogleButton from "../buttons/GoogleButton";
import { FunctionComponent } from "react";
import GitHubButton from "../buttons/GithubButton";
import {BigLogo} from "../Logo";
interface SignUpProps {
    
}
 
const SignUp: FunctionComponent<SignUpProps> = () => {
    return ( 
        <div className="flex flex-col gap-3 px-16 py-10 justify-center items-center max-w-[500px]">
                <BigLogo />
                <GoogleButton />
                <GitHubButton />
        </div>
     );
}
 
export default SignUp