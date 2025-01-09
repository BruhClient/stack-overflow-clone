import LoginButton from "./buttons/LoginButton";
import {Logo} from "./Logo";
import SearchBar from "./SearchBar";
import SignupButton from "./buttons/SignupButton";
import { getAuthSession } from "@/lib/auth";
import UserAvatar from "./UserAvatar";

const Navbar= async () => {
    const session = await getAuthSession()

    return ( <div className="fixed border-b-2 border-card z-[10] py-2 flex items-center justify-between gap-3 px-5 w-full h-[20] bg-background">
        <Logo/>
        <SearchBar />

        {!session ? (<div className=" gap-3 hidden md:flex">
            <LoginButton />
            <SignupButton />
        </div>): <UserAvatar session={session}/>}
        
        </div> );
}
 

export default Navbar;