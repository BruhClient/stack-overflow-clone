import Login from "@/components/modals/login";

export const dynamic = "force-dynamic"

const LoginPage = () => {
    return ( <div className="absolute inset-x-0 top-0 flex h-full items-center justify-center"><Login /></div> );
}
 
export default LoginPage;