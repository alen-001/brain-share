"use client";
import { useState } from "react";
import { DocType, transformFetchedDoc } from "@/doc.types";
import { Button } from "./ui/button";
export default function DocumentsList({ docs }: { docs: DocType[] }) {
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
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      const data = await res.json();
      const newDoc=transformFetchedDoc(data);
      setDocuments((prevDocs) => [...prevDocs, newDoc]);
      console.log(newDoc);
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
  const handleUpdate = async (id: string, newTitle: string, newContent: string) => {
    console.log(id, newTitle, newContent);
    const res = await fetch(`/api/documents/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, content: newContent }),
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

      {/* Create Document Form */}
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
      <Button onClick={handleCreate}>Create Document</Button>

      {/* Documents List */}
      {documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        <ul>
          {documents.map((doc,idx) => (
            <li key={idx}>
              <h3>{doc.title}</h3>
              <p>{doc.content}</p>
              <Button onClick={() => handleUpdate(doc.id, "Updated Title", "Updated Content")}>Update</Button>
              <Button onClick={() => handleDelete(doc.id)}>Delete</Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
