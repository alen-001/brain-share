// "use client"
import { Brain, BrainCircuit, PlusCircle, Waypoints } from "lucide-react"
import Image from "next/image"
import { RedirectToSignIn, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import DocumentsPage from "@/components/document-page"
export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <SignedOut>
      <RedirectToSignIn/>
      </SignedOut>
      <SignedIn>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          {/* <BrainCircuit className="h-8 w-8" strokeWidth={1}/> */}
          <Image src="/assets/share.svg" alt="Brain Share" width={30} height={30} className="brightness-200 invert" />
          <h1 className="text-2xl font-bold font-mono -mx-2">Brain Share</h1>
        </div>
              <UserButton />
      </div>
      <DocumentsPage/>
      </SignedIn>
    </div>
  )
}
