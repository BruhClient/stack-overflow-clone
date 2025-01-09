
import CloseModal from "@/components/modals/closeModal";
import SignUp from "@/components/modals/signup";
 
const SignUpModal= () => {
    
    return ( <div className="absolute inset-x-0 flex w-full h-screen justify-center items-center pointer-events-none">
            
            <div className="rounded-lg pointer-events-auto relative bg-card z-50">
                <CloseModal className="absolute top-2 right-2"/>
                <SignUp />
            </div>
            
        </div> );
}
 
export default SignUpModal;