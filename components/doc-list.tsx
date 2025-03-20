"use client";
import { useState } from "react";
import { DocType, transformFetchedDoc } from "@/doc.types";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import EditDocumentModal from "./edit-document-modal";
import { useRouter } from "next/navigation";
export default function DocumentsList({ docs }: { docs: DocType[] }) {
  const router=useRouter();
  const [documents, setDocuments] = useState<DocType[]>(docs);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredDocuments = (documents.length>0)?documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  ):[];
  // Create a new document
  const handleCreate = async () => {
    const res = await fetch("/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title:"Untitled Doc", content:"" }),
    });
    if (res.ok) {
      const data = await res.json();
      const newDoc=transformFetchedDoc(data);
      setDocuments((prevDocs) => [...prevDocs, newDoc]);
      console.log(newDoc);
      router.push(`/documents/${newDoc.id}`);
      console.log(documents);
      setTitle("");
      setContent("");
    }
  };

  // Delete a document
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/documents/${id}`, { method: "DELETE" });
    if (res.ok) {
      setDocuments(documents.filter((doc) => doc.id !== id));
    }
  };

  // Update a document
  const handleUpdate = async (document:DocType) => {
    const {id,title,content,description,tags}=document;
    const res = await fetch(`/api/documents/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content,description:description?description:"",tags: tags?tags:[] }),
    });
    if (res.ok) {
      const data = await res.json();
      const updatedDoc=transformFetchedDoc(data);
      setDocuments(documents.map((doc) => (doc.id === id ? updatedDoc : doc)));
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
  return (
    <div>
      <h1>Your Documents</h1>
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
      <Button onClick={handleCreate}>Create new Document</Button>

      {/* Documents List */}
      {documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        <ul>
          {documents.map((doc,idx) => (
            <li key={idx}>
              <h3>{doc.title}</h3>
              <p>{doc.content}</p>
              {/* <EditDocumentModal document={doc} onSave={handleUpdate} /> */}
              <Button onClick={() => handleUpdate(doc)}>Update</Button>
              <Button onClick={() => handleDelete(doc.id)}>Delete</Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
