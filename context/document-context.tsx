'use client'
import { Doc } from "@/doc.types";
import { createContext, useState, useContext } from "react";
interface DocumentContextType {
    documents: Doc[];
    setDocuments: React.Dispatch<any>;
}

const DocumentContext = createContext<DocumentContextType | null>(null);
import { ReactNode } from "react";
export const DocumentProvider = ({ children }: { children: ReactNode }) => {
    const [documents, setDocuments] = useState([]);
    return (<DocumentContext.Provider value={{ documents, setDocuments }}>{children}</DocumentContext.Provider>);
};
export const useDocumentContext = () => {
    const context = useContext(DocumentContext);
    if (!context) {
        throw new Error("useDocumentContext must be used within a DocumentProvider");
    }
    return context;
}