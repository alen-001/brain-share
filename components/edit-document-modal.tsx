"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { DocType } from "@/doc.types"

interface EditDocumentModalProps {
  isOpen: boolean
  onClose?: () => void
  onOpenEditor: () => void
  document: DocType
  onSave: (document: DocType) => void
}

export default function EditDocumentModal({ isOpen, onClose, onOpenEditor, document, onSave }: EditDocumentModalProps) {
  const [title, setTitle] = useState(document.title)
  const [description, setDescription] = useState(document.description || "")
  const [tags, setTags] = useState<string[]>(document.tags || [])
  const [newTag, setNewTag] = useState("")
  const { toast } = useToast()
  const router = useRouter()
  // const handleUpdate = async (id: string, newTitle: string, newContent: string) => {
  //   console.log(id, newTitle, newContent);
  //   const res = await fetch(`/api/documents/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ title: newTitle, content: newContent }),
  //   });
  //   if (res.ok) {
  //     const data = await res.json();
  //     const updatedDoc=transformFetchedDoc(data);
  //     setDocuments(documents.map((doc) => (doc.id === id ? updatedDoc : doc)));
  //   }
  // };
  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a title for your document.",
        variant: "destructive",
      })
      return
    }


    onSave({
      id: document.id,
      title,
      description: description.trim() ? description : undefined,
      tags: tags.length > 0 ? tags : undefined,
      updatedAt: new Date().toISOString(),
      content:document.content || ""
    })
    // save metadata in backend

    toast({
      title: "Document updated",
      description: "Document metadata has been updated successfully.",
    })

  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Document</DialogTitle>
          <DialogDescription>
            Update the document metadata. Click save to update or open editor to modify content.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Document title" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the document"
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  #{tag}
                  <button type="button" onClick={() => removeTag(tag)} className="rounded-full hover:bg-muted p-0.5">
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {tag} tag</span>
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a tag (e.g. productivity)"
              />
              <Button type="button" size="icon" onClick={addTag}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add tag</span>
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={onOpenEditor}>
            Open Editor
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

