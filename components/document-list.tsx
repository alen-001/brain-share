"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, FileText, Trash2, Edit, Share, PlusCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
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
type Document = {
  id: string
  title: string
  updatedAt: string
  content: string
}
// Mock data for documents
const initialDocuments: Document[] = [
  { id: "1", title: "Project Proposal", updatedAt: "2023-11-10T14:30:00Z", content: "This is a project proposal..." },
  { id: "2", title: "Meeting Notes", updatedAt: "2023-11-09T10:15:00Z", content: "Notes from the team meeting..." },
  { id: "3", title: "Research Findings", updatedAt: "2023-11-08T16:45:00Z", content: "Our research findings show..." },
]

export default function DocumentList() {
  const [documents, setDocuments] = useState(initialDocuments)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  // Filter documents based on search query
  const filteredDocuments = (documents.length>0)?documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase()),
  ):[];

  // Delete document
  const deleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
    toast({
      title: "Document deleted",
      description: "The document has been successfully deleted.",
    })
  }

  // Share document
  const shareDocument = (id: string) => {
    // In a real app, this would generate a sharing link or open a sharing dialog
    navigator.clipboard.writeText(`https://real-docs.example/shared/${id}`)
    toast({
      title: "Share link copied",
      description: "Document share link has been copied to clipboard.",
    })
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
            <Card key={doc.id}>
              <CardHeader className="pb-2">
                <CardTitle className="truncate">{doc.title}</CardTitle>
                <CardDescription>Last updated: {formatDate(doc.updatedAt)}</CardDescription>
              </CardHeader>
              <CardContent className="h-24 overflow-hidden text-sm text-muted-foreground">
                <p className="line-clamp-4">{doc.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex space-x-2">
                  <Link href={`/documents/${doc.id}`}>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the document.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteDocument(doc.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <Button variant="outline" size="icon" onClick={() => shareDocument(doc.id)}>
                  <Share className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

