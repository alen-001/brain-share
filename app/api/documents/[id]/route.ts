import { auth } from "@clerk/nextjs/server";
import {connectDB} from "@/lib/db";
import Doc from "@/models/doc.model";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req:NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } =await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const {id} = await params;
  try {
    const document = await Doc.findOne({ _id: id, userId });
    if (!document) {
      return NextResponse.json({ message: "document not found" }, { status: 404 });
    }
    return NextResponse.json(document, { status: 200 });
  } catch (_error) {
    return NextResponse.json({ error: `Error fetching document` }, { status: 500 });
  }
}

export async function PUT(req:NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } =await auth();
  const {id}=await params;
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  try {
    const { title, content,description,tags } = await req.json();
    const updatedDoc = await Doc.findOneAndUpdate(
      { _id: id, userId },
      { title, content ,description:description?description:"",tags:tags?tags:[]},
      { new: true }
    );
    if (!updatedDoc) {
      return NextResponse.json({ message: "Document not found" }, { status: 404 });
    }
    revalidatePath("/documents");
    return NextResponse.json(updatedDoc, { status: 200 });
  } catch (_error) {
    return NextResponse.json({ error: "Error updating doc" }, { status: 500 });
  }
}

export async function DELETE(req:NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } =await auth();

  const {id}=await params;
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const deletedDoc = await Doc.findOneAndDelete({ _id: id, userId });
    revalidatePath("/documents");
    if (!deletedDoc) {
      return NextResponse.json({ message: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Document deleted successfully" }, { status: 200 });
  } catch (_error) {
    return NextResponse.json({ error: "Error deleting Document" }, { status: 500 });
  }
}
