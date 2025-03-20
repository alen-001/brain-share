"use client"

import { useEffect, useState,useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Save, Share, Edit } from "lucide-react"
import Link from "next/link"
import TipTapEditor,{TipTapEditorRef} from "@/components/tiptap-editor"
import { toast } from "sonner"
import EditDocumentModal from "@/components/edit-document-modal"
import { DocType } from "@/doc.types"
import { set } from "mongoose"

// Mock data for documents - expanded with description and tags
const documents: DocType[] = [
  {
    id: "1",
    title: "Project Proposal",
    updatedAt: "2023-11-10T14:30:00Z",
    content:
      "<h2>Project Proposal</h2><p>This is a detailed project proposal for our new initiative.</p><p>The project aims to revolutionize how we approach document management by introducing a seamless, intuitive interface that makes creating and editing documents a breeze.</p><h3>Key Features</h3><ul><li>Real-time collaboration</li><li>Version history</li><li>Smart formatting</li><li>Cloud synchronization</li></ul><p>By implementing these features, we expect to see a 30% increase in team productivity and a significant reduction in document-related confusion.</p>",
    description: "A comprehensive proposal for our new project initiative",
    tags: ["project", "planning", "proposal"],
  },
  {
    id: "2",
    title: "Meeting Notes",
    updatedAt: "2023-11-09T10:15:00Z",
    content:
      "<h2>Team Meeting Notes</h2><p>Notes from our weekly team meeting discussing project progress.</p><h3>Attendees</h3><ul><li>John Smith</li><li>Sarah Johnson</li><li>Michael Brown</li><li>Emily Davis</li></ul><h3>Discussion Points</h3><ol><li>Project timeline review</li><li>Budget allocation</li><li>Resource distribution</li><li>Next steps</li></ol><p>The team agreed to accelerate the development phase to meet the upcoming deadline. Additional resources will be allocated to the frontend team.</p>",
    description: "Notes from our weekly team meeting on project progress",
    tags: ["meeting", "notes", "team"],
  },
  {
    id: "3",
    title: "Research Findings",
    updatedAt: "2023-11-08T16:45:00Z",
    content:
      "<h2>Research Findings</h2><p>Our research findings show interesting patterns in user behavior.</p><p>After analyzing data from over 1,000 users, we've identified several key insights that will inform our product development strategy.</p><h3>Key Insights</h3><ul><li>Users spend an average of 15 minutes per session</li><li>The most used feature is document sharing</li><li>Mobile usage has increased by 45% since last quarter</li><li>User retention is highest among those who use tags</li></ul><p>These findings suggest we should focus on enhancing our mobile experience and expanding our tagging system to improve user engagement.</p>",
    description: "Analysis of recent user behavior patterns and insights",
    tags: ["research", "analysis", "data"],
  },
]

export default function DocumentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const editorRef = useRef<TipTapEditorRef>(null);
  const [currentDoc, setCurrentDoc] = useState<DocType>({id:"",title:"",updatedAt:"",content:"",description:"",tags:[]});
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [content, setContent] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const isNewDocument = params.id === "new"
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  // useEffect(()=>{
  //   const 
  // })
  // useEffect(() => {
  //   if (!isNewDocument) {
  //     const doc = documents.find((doc) => doc.id === params.id)
  //     if (doc) {
  //       setCurrentDoc(doc)
  //     } else {
  //       // Document not found, redirect to home
  //       toast.error("Document not found",{
  //         description: "The document you are looking for does not exist.",
  //         className: "bg-red-500 text-white"
  //       })
  //       router.push("/home")
  //     }
  //   }
  // }, [params.id, isNewDocument, router, toast])

  const handleSaveMetadata = (updatedDoc: DocType) => {
    setCurrentDoc(updatedDoc)
    documents.forEach((doc) => {
      if (doc.id === updatedDoc.id) {
        doc.title = updatedDoc.title
        doc.description = updatedDoc.description
        doc.tags = updatedDoc.tags
      }
    }
    )
    console.log(documents);
    // In a real app, this would update the backend
    toast.success("Document updated",{
      className: "bg-green-500 "}
    )
  }

  const handleSave = () => {
    if (!currentDoc.title.trim()) {
      toast.error("Title required",{
        description: "Please provide a title for your document.",
        className: "bg-red-500 text-white"
      })
      return;
    }
    const editorContent = editorRef.current?.getHTML();
    console.log(currentDoc);
    setCurrentDoc({...currentDoc,content:editorContent || ""});
    setIsSaving(true)

    // Simulate saving to backend
    // setTimeout(() => {
    //   setIsSaving(false)
    //   toast({
    //     title: "Document saved",
    //     description: "Your document has been saved successfully.",
    //   })

    //   if (isNewDocument) {
    //     // In a real app, we would get the new ID from the backend
    //     router.push("/home")
    //   }
    // }, 100)
  }

  const handleShare = () => {
    // In a real app, this would generate a sharing link or open a sharing dialog
    navigator.clipboard.writeText(`https://real-docs.example/shared/${params.id}`)
    toast.success("Share link copied",{
      description: "Document share link has been copied to clipboard."
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/home">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Input
            type="text"
            placeholder="Document Title"
            className="text-xl font-medium h-10 w-[300px] md:w-[400px]"
            value={currentDoc.title}
            onChange={(e) => setCurrentDoc({...currentDoc,title:e.target.value})}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Metadata
          </Button>
          <Button variant="outline" onClick={handleShare} disabled={isNewDocument}>
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button onClick={handleSave}>
            {/* {isSaving ? (
              "Saving..."
            ) : (
              <> */}
                <Save className="mr-2 h-4 w-4" />
                Save
              {/* </>
            )} */}
          </Button>
        </div>
      </div>

      <div className="border rounded-lg p-4 min-h-[500px] text-white bg-black">
        <TipTapEditor ref={editorRef} content={content} onChange={(content) => console.log(content)}  />
      </div>

      <EditDocumentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onOpenEditor={() => {}} // Already in editor
        document={currentDoc}
        onSave={handleSaveMetadata}
      />
    </div>
  )
}
