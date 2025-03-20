"use client"

import { useEffect, useState,useRef, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Save, Share, Edit } from "lucide-react"
import Link from "next/link"
import TipTapEditor,{TipTapEditorRef} from "@/components/tiptap-editor"
import { toast } from "sonner"
import EditDocumentModal from "@/components/edit-document-modal"
import { DocType, transformFetchedDoc } from "@/doc.types"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"

export default function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const {getToken}=useAuth()
  const editorRef = useRef<TipTapEditorRef>(null);
  const [currentDoc, setCurrentDoc] = useState<DocType>({id:"",title:"",updatedAt:"",content:"",description:"",tags:[]});
  const [content, setContent] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const id=use(params).id;
  async function getDoc(){
    try{
      const token = await getToken();
      const res = await axios.get(`/api/documents/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
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
        setCurrentDoc(data);
        setContent(data.content);
      } else {
        toast.error("Document not found", {
          description: "The document you are looking for does not exist.",
        });
        router.push("/home");
      }
    })
  },[id])
  useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.setContent(content);
    }
  }, [content]);
    const handleUpdate = async (document:DocType) => {
      const {id,title,content,description,tags}=document;
      try{
        const token = await getToken();
        const res=await axios.put(`/api/documents/${id}`,
          { title, content,description:description,tags},
          { headers: { "Content-Type": "application/json"
          ,Authorization: `Bearer ${token}` } }
        );
        if (res.status===200) {
          const data=res.data;
          const updatedDoc=transformFetchedDoc(data);
          setCurrentDoc(updatedDoc);
        }
      }catch(err){
        console.error(err);
        toast.error("Error updating document",{
          description: "An error occurred while updating the document. Please try again later."
        })
      }
    }
    const handleSaveMetadata =async (updatedDoc: Partial<DocType>) => {

      setCurrentDoc((prev) => ({ ...prev, ...updatedDoc }));
      setIsEditModalOpen(false);
    };
    
  const handleSave = () => {
    if (!currentDoc.title.trim()) {
      toast.error("Title required",{
        description: "Please provide a title for your document.",
        className: "bg-red-500 text-white"
      })
      return;
    }
    // const editorContent = editorRef.current?.getHTML();
    // setCurrentDoc({...currentDoc,content:editorContent || ""});
    setIsSaving(true)
    handleUpdate(currentDoc);
    setIsSaving(false)
    toast.success("Document saved",{
      description: "Your document has been saved successfully."
    })
  }

  const handleShare =async () => {
    try{
      const token=await getToken();
      const res=await axios.get(`/api/documents/${id}/share`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      const data=res.data;
      const shareId=data.shareId;
      navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/documents/view/shared/${shareId}`)
      toast.success("Share link copied",{
        description: "Document share link has been copied to clipboard."
      })
    }catch(err){
      console.error(err);
      toast.error("Error sharing document",{
        description: "An error occurred while sharing the document. Please try again later."
      })
    }
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
          <Button variant="outline" onClick={handleShare} >
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              "Saving..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="border rounded-lg p-4 min-h-[500px] text-white bg-black">
        <TipTapEditor ref={editorRef} content={content} onChange={(c) => {
          setCurrentDoc(prev => ({ ...prev, content: c }))
          }} />
      </div>

      <EditDocumentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        document={currentDoc}
        onSave={handleSaveMetadata}
      />
    </div>
  )
}
