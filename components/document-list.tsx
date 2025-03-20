"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, FileText, Trash2, Edit, Share, PlusCircle } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DocType, transformFetchedDoc } from "@/doc.types"
// Mock data for documents
const initialDocuments:DocType[] = [
  {
    id: "1",
    title: "Project Proposal",
    updatedAt: "2023-11-10T14:30:00Z",
    content: "This is a project proposal...",
    description: "A comprehensive proposal for our new project initiative",
    tags: ["project", "planning", "proposal"],
  },
  {
    id: "2",
    title: "Meeting Notes",
    updatedAt: "2023-11-09T10:15:00Z",
    content: "Notes from the team meeting...",
    description: "Notes from our weekly team meeting on project progress",
    tags: ["meeting", "notes", "team"],
  },
  {
    id: "3",
    title: "Research Findings",
    updatedAt: "2023-11-08T16:45:00Z",
    content: "Our research findings show...",
    description: "Analysis of recent user behavior patterns and insights",
    tags: ["research", "analysis", "data"],
  },
]


export default async function DocumentList() {
  // const {getToken}=useAuth()
  // const [documents, setDocuments] = useState<DocType[]>(initialDocuments)
  const documents=initialDocuments;
  const getDocuments = async () => {

  // const{data:docsData,isLoading,error } =useQuery({
  //   queryKey:["documents"],
  //   queryFn: async () => {
  //     const token= await getToken();
  //     const res = await axios.get("/api/documents",{
  //       headers:{
  //         Authorization:`Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     return res.data
  //   },
  //   retry: 2,
  //   staleTime: 5 * 60 * 1000, 
  // })
  // useEffect(()=>{
  //   if (docsData) {
  //     console.log(docsData)
  //   }
  //   if(error){
  //     toast.error("Error fetching documents")
  //   }
  // }
  //   ,[docsData])
  // const [documents, setDocuments] = useState(initialDocuments)
  const [searchQuery, setSearchQuery] = useState("")
  // const router = useRouter()
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Filter documents based on search query
  const filteredDocuments = (documents.length>0)?documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  ):[];

  // Delete document
  const deleteDocument = () => {
    if (documentToDelete) {
      setDocuments(documents.filter((doc) => doc.id !== documentToDelete))
      toast("Document deleted")
      setDocumentToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }
  const openDeleteDialog = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDocumentToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  // Share document
  const shareDocument = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // In a real app, this would generate a sharing link or open a sharing dialog
    navigator.clipboard.writeText(`http://${process.env.NEXT_API_BASE_URL}/share/${id}`)
    // toast({
    //   title: "Share link copied",
    //   description: "Document share link has been copied to clipboard.",
    // })
  }
  
  const handleCreate = () => {
  }
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
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

      {filteredDocuments.length === 0 ? (
        <div className="text-center py-10">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No documents found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchQuery ? "Try a different search term" : "Create your first document to get started"}
          </p>
          {!searchQuery && (
            <Link href="/documents/new">
              <Button className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Document
              </Button>
            </Link>
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
                  <p className="line-clamp-2">{doc.description || doc.content}</p>
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
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-2">
                    <Link href={`/documents/${doc.id}`}>
                    <Button
                      variant="outline"
                      size="icon"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    </Link>
                    <Button variant="outline" size="icon" onClick={(e) => openDeleteDialog(doc.id, e)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="icon" onClick={(e) => shareDocument(doc.id, e)}>
                    <Share className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Link>
            </Card>
          ))}
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
          <Button onClick={handleCreate}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Document
          </Button>
    </div>
  )
}}

