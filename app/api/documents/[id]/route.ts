import { auth } from "@clerk/nextjs/server";
import {connectDB} from "@/lib/db";
import Doc from "@/models/doc.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, { params }: { params: { id: string } }) {
//   const { userId } =await auth();
  const userId="1234";
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
  } catch (error) {
    return NextResponse.json({ error: "Error fetching document" }, { status: 500 });
  }
}

export async function PUT(req:NextRequest, { params }: { params: { id: string } }) {
//   const { userId } =await auth();
  const userId="1234";
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const {id}=await params;
  try {
    const { title, content } = await req.json();
    const updatedDoc = await Doc.findOneAndUpdate(
      { _id: id, userId },
      { title, content },
      { new: true }
    );

    if (!updatedDoc) {
      return NextResponse.json({ message: "Document not found" }, { status: 404 });
    }

    return NextResponse.json(updatedDoc, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating doc" }, { status: 500 });
  }
}

export async function DELETE(req:NextRequest, { params }: { params: { id: string } }) {
//   const { userId } =await auth();
  const userId="1234";
  const {id}=await params;
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const deletedDoc = await Doc.findOneAndDelete({ _id: id, userId });

    if (!deletedDoc) {
      return NextResponse.json({ message: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Document deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting Document" }, { status: 500 });
  }
}
