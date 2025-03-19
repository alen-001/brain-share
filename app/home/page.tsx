'use client'
import { Button } from "@/components/ui/button"
import { Brain, BrainCircuit, PlusCircle, Waypoints } from "lucide-react"
import Link from "next/link"
import DocumentList from "@/components/document-list"
import Image from "next/image"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton,useUser } from "@clerk/nextjs"
import { useEffect } from "react"
export default function Home() {
  const { user } = useUser(); // Get the logged-in user

  useEffect(() => {
    if (user) {
      console.log("Clerk User ID:", user.id);
    }
  }, [user]);
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          {/* <BrainCircuit className="h-8 w-8" strokeWidth={1}/> */}
          {/* <Image src="/assets/share.svg" alt="Brain Share" width={30} height={30} className="brightness-200 invert" /> */}
          <h1 className="text-2xl font-bold font-mono ">Brain Share</h1>
        </div>
        <SignedOut>
              <SignInButton/>
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        {/* <Link href="/documents/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Document
          </Button>
        </Link> */}
      </div>
      <DocumentList />
    </div>
  )
}
