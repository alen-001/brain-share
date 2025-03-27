"use client";
import { useState } from "react";
import { DocType, transformFetchedDoc } from "@/doc.types";
import { Button } from "@/components/ui/button";
import { Search, FileText, Trash2, Edit, Share, PlusCircle, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"; 
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import useDebounce from "@/hooks/useDebounce";
export default function DocumentsList({ docs }: { docs: DocType[] }) {
  const router=useRouter();
  const [isCreating,setisCreating]=useState(false);
  const [isSharing,setisSharing]=useState(false);
  const [documents, setDocuments] = useState<DocType[]>(docs);
  const [searchQuery, setSearchQuery] = useState("");
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const filteredDocuments = (documents.length>0)?documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  ):[];
  // Create a new document
  const {getToken}=useAuth();
  const handleCreate = async () => {
    setisCreating(true);
    const res = await fetch("/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title:"Untitled Doc", content:"" }),
    });
    if (res.ok) {
      const data = await res.json();
      const newDoc=transformFetchedDoc(data);
      setDocuments((prevDocs) => [...prevDocs, newDoc]);
      setisCreating(false);
      toast.success("Document created successfully!");
      router.push(`/documents/${newDoc.id}`);
    }
  };
  const deleteDocument = () => {
    if (documentToDelete) {
      handleDelete(documentToDelete)
      toast("Document deleted")
      setDocumentToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }
  // Delete a document
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/documents/${id}`, { method: "DELETE" });
    if (res.ok) {
      setDocuments(documents.filter((doc) => doc.id !== id));
    }
  };
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
  //delete dialog
  const openDeleteDialog = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDocumentToDelete(id)
    setIsDeleteDialogOpen(true)
  }
  //share 
    const handleShare =async (id:string) => {
      try{
        setisSharing(true);
        const token=await getToken();
        const res=await axios.get(`/api/documents/${id}/share`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        const data=res.data;
        const shareId=data.shareId;
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/documents/view/shared/${shareId}`)
        setisSharing(false);
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
  const shareDocument = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleShare(id);

  }
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search documents..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* Create Document Form */}
      {/* <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" /> */}

      {filteredDocuments.length === 0 ? (
        <div className="text-center py-10">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No documents found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchQuery ? "Try a different search term" : "Create your first document to get started"}
          </p>
          {!searchQuery && (
              <Button className="mt-4" onClick={handleCreate}>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Document
              </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <Link href={`/documents/view/${doc.id}`} className="block h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="truncate">{doc.title}</CardTitle>
                  <CardDescription>Last updated: {formatDate(doc.updatedAt)}</CardDescription>
                </CardHeader>
                <CardContent className="h-24 overflow-hidden text-sm text-muted-foreground">
                  <p className="line-clamp-2">{doc.description || ""}</p>
                  {doc.tags && doc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {doc.tags.map((tag) => (
                        <Badge key={tag}  variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                </Link>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-2">
                    <Link href={`/documents/${doc.id}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:text-blue-400"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    </Link>
                    <Button variant="outline" size="icon" className="hover:text-red-400" onClick={(e) => openDeleteDialog(doc.id, e)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="icon" className='hover:text-green-300'onClick={(e) => shareDocument(doc.id, e)} disabled={isSharing}>
                    <Share className="h-4 w-4" />
                  </Button>
                </CardFooter>
            </Card>
          ))}
          <Card className="flex items-center justify-center">
            <Button onClick={handleCreate} disabled={isCreating}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {isCreating?<>Creating...</>:<>Add new Document</>}
          </Button>
          </Card>
        </div>
      )}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the document.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDocumentToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteDocument}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* <button title="Add note" className="absolute right-16 bottom-6 text-black opacity-50 transform -translate-y-1/2 bg-white hover:bg-white hover:scale-150 hover:-translate-x-4  transition duration-200 p-2 rounded-full shadow-md"
                    onClick={handleCreate}>
                    <Plus className='w-10 h-10' strokeWidth="1"/>
                </button> */}
          {/* <Button onClick={handleCreate}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Document
          </Button> */}
    </div>
  );
}
