import { auth } from "@clerk/nextjs/server";
import {connectDB} from "@/lib/db";
import Doc from "@/models/doc.model";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// export async function GET(req:NextRequest) {
//   const { userId } =await auth();

//   if (!userId) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }
  // const userId="1234";
//   await connectDB();

//   try {
//     const docs = await Doc.find({ userId });
//     return NextResponse.json(docs, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Error fetching documents" }, { status: 500 });
//   }
// }

export async function POST(req:NextRequest) {
  const { userId } =await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  try {
    const { title, content, description, tags } = await req.json();
    const newDoc = new Doc({ title, content, userId, description: (description ? description : ""), tags: (tags ? tags : []) });
    await newDoc.save();
    revalidatePath("/documents");
    return NextResponse.json(newDoc, { status: 201 });
  } catch (error:any) {
    return NextResponse.json({ error: `Error creating document ${error.message}` }, { status: 500 });
  }
}
