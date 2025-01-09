
import Login from "@/components/modals/login";
import CloseModal from "@/components/modals/closeModal";
 
const LoginModal= () => {
    
    return ( <div className="absolute inset-x-0 flex w-full px-3   h-screen justify-center items-center pointer-events-none ">
            
            <div className="rounded-lg pointer-events-auto relative bg-card z-50">
                <CloseModal className="absolute top-2 right-2"/>
                <Login />
            </div>
            
        </div> );
}
 
export default LoginModal;