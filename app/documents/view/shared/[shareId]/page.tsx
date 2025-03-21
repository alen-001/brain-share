"use client"
import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {toast} from "sonner"
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import axios from "axios"
import { DocType, transformFetchedDoc } from "@/doc.types"
import Loader from "@/components/loader"
export default function SharedDocumentViewPage({ params }:{params : Promise<{shareId: string}>}) {
  const router = useRouter()
  const [document, setDocument] = useState<DocType>()
  const {shareId}=use(params)
  async function getDoc(){
    try{
      const res = await axios.get(`/api/share/${shareId}`);
      const data=res.data;
      return transformFetchedDoc(data);
    }catch(err){
      console.error(err);
      toast.error("Error fetching document",{
        description: "An error occurred while fetching the document. Please try again later.",})
    }
  }

  useEffect( ()=>{
    getDoc().then((data)=>{
      if (data) {
        setDocument(data);
      } else {
        toast.error("Document not found", {
          description: "The document you are looking for does not exist.",
        });
        router.push("/");
      }
    })
  },[shareId])
  if (!document) {
    return <Loader/>
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <Link href="/home">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-3">{document.title}</h1>
          {document.description && <p className="text-muted-foreground mb-4">{document.description}</p>}
          <div className="flex flex-wrap gap-2 mb-4">
            {document.tags?.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            Last updated:{" "}
            {new Date(document.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </header>

        <div className="prose max-w-none text-white" >
            {
              parse(DOMPurify.sanitize(document.content))
            }
        </div>
      </article>

    </div>
  )
}

