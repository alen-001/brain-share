import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Doc from "@/models/doc.model";
import DocumentsList from "./doc-list";
import { transformFetchedDoc } from "@/doc.types";
export default async function DocumentsPage() {
  const { userId } = await auth();
  if (!userId) return <p>Unauthorized</p>;

  await connectDB();
  try {
    const docs = await Doc.find({ userId }).lean();
    return <DocumentsList docs={JSON.parse(JSON.stringify(docs.map(transformFetchedDoc)))} />;
  } catch (_error) {
    return <p>Error fetching documents.</p>;
  }
}
