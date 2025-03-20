"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"
import EditDocumentModal from "@/components/edit-document-modal"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import parse from "html-react-parser";
import DOMPurify from "dompurify";
// Mock data for documents - expanded with description and tags
const documents = [
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

export default function DocumentViewPage({ params }:{params : Promise<{id: string}>}) {
  const router = useRouter()
  const { toast } = useToast()
  const [document, setDocument] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const {id}=use(params)
  useEffect(() => {
    const doc = documents.find((doc) => doc.id ===  id)
    if (doc) {
      setDocument(doc)
    } else {
      // Document not found, redirect to home
      router.push("/")
    }
  }, [id, router])

  const handleSaveMetadata = (updatedDoc: any) => {
    // In a real app, this would update the backend
    setDocument({
      ...document,
      title: updatedDoc.title,
      description: updatedDoc.description,
      tags: updatedDoc.tags,
    })
  }

  const handleOpenEditor = () => {
    router.push(`/documents/${id}`)
  }

  if (!document) {
    return <div className="container mx-auto py-10">Loading...</div>
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <Link href="/home">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
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
                parse(document.content)
            }
        </div>
      </article>

      <EditDocumentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onOpenEditor={handleOpenEditor}
        document={document}
        onSave={handleSaveMetadata}
      />
    </div>
  )
}

