import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
});


export const notesIndex = pinecone.Index('nextjs-ai-note-app')