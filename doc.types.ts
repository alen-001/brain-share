export type DocType = {
    id: string
    title: string
    updatedAt: string
    content: string
    description?:string
    tags?:string[]
}
export const transformFetchedDoc = (doc: any): DocType => {
    return {
      id: doc._id.toString(),
      title: doc.title,
      updatedAt: typeof doc.updatedAt === 'string' ? doc.updatedAt : doc.updatedAt.toISOString(),
      content: doc.content || '',
      description: doc.description || '',
      tags: doc.tags || [],
    };
  };