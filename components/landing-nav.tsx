// "use client"
import Image from "next/image"
import {  SignedIn, SignedOut,UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function LandingNav() {
  return (
    
    <nav
    className="w-11/12 z-50 absolute top-0 left-1/2 transform -translate-x-1/2 my-10 bg-transparent flex justify-between items-center h-16  text-white shadow-sm font-mono p-9 rounded-2xl border-[1px]  "
    role="navigation"
>   
        <div className="flex items-center space-x-4">
          {/* <BrainCircuit className="h-8 w-8" strokeWidth={1}/> */}
          <Image src="/assets/share.svg" alt="Brain Share" width={30} height={30} className="brightness-200 invert" />
          <h1 className="text-2xl bg-opacity-50 bg-gradient-to-b font-mono from-neutral-50 to-neutral-400 bg-clip-text text-center  font-bold text-transparent ">BrainShare</h1>
        </div>
        <SignedOut>
          <Link href="/sign-in">
          <Button variant="outline">
            Sign in
          </Button>
          </Link>
      </SignedOut>
        <SignedIn>
              <UserButton />
        </SignedIn>
    </nav>
  )
}
