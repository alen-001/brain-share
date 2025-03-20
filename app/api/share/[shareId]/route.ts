import {connectDB} from "@/lib/db";
import Doc from "@/models/doc.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, { params } : { params: Promise<{ shareId: string }> }) {
    await connectDB();
    const { shareId } = await params;
    try {
    const doc = await Doc.findOne({ shareId: shareId});

    if (!doc) {
        return NextResponse.json({ message: "Document not found" }, { status: 404 });
    }
    return NextResponse.json(doc, { status: 200 });
  } catch (_error) {
    return NextResponse.json({ error: "Error fetching shared document" }, { status: 500 });
  }
}
