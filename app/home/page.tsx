// "use client"
import Image from "next/image"
import { RedirectToSignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import DocumentsPage from "@/components/document-page"
import Link from "next/link"
export default function Home() {
  return (
    <div className="container mx-auto md:px-2 sm:px-2 py-10">
      <SignedOut>
      <RedirectToSignIn/>
      </SignedOut>
      <SignedIn>
      <div className="flex justify-between items-center mb-8 ">
        <div className="flex items-center space-x-4">
          {/* <BrainCircuit className="h-8 w-8" strokeWidth={1}/> */}
          <Link href='/' className="flex gap-2 ">
          <Image src="/assets/share.svg" alt="Brain Share" width={30} height={30} className="brightness-200 invert" />
          <h1 className="text-2xl bg-opacity-50 bg-gradient-to-b font-mono from-neutral-50 to-neutral-400 bg-clip-text text-center  font-bold text-transparent  ">BrainShare</h1>
          </Link>
        </div>
          <UserButton />
      </div>
      <DocumentsPage/>
      </SignedIn>
    </div>
  )
}
