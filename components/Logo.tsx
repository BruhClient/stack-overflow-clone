"use client"


import { useRouter } from "next/navigation"





const Logo = () => {

    const router = useRouter()
    return <div className={`font-display md:text-2xl text-lg tracking-wider text-green-400  cursor-pointer`} onClick={() => router.back()}>
        Stack <span className="text-red-400">Underflow</span>
    </div>
}

const BigLogo = () => {

  const router = useRouter()
  return <div className={`font-display md:text-4xl text-xl   tracking-wider text-green-400  cursor-pointer`} onClick={() => router.back()}>
      Stack <span className="text-red-400">Underflow</span>
  </div>
}

export {Logo,BigLogo}