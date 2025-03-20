import { auth } from "@clerk/nextjs/server";
import {connectDB} from "@/lib/db";
import Doc from "@/models/doc.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } =await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  // const userId="1234";
  await connectDB();
  const {id}=await params;
  try {
    const doc = await Doc.findOne({ _id: id, userId });

    if (!doc) {
      return NextResponse.json({ message: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({ shareId: doc.shareId }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error generating share link" }, { status: 500 });
  }
}
