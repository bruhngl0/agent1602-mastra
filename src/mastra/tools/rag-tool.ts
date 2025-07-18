import { createVectorQueryTool } from "@mastra/rag";
import { PineconeVector } from "@mastra/pinecone";
import { openai } from "@ai-sdk/openai";
import * as dotenv from "dotenv";

dotenv.config();
console.log(process.env.PINECONE_API_KEY);

export const pinecone = new PineconeVector({
  apiKey: process.env.PINECONE_API_KEY!,
});
export const vectorQueryTool = createVectorQueryTool({
  vectorStoreName: "pinecone",
  indexName: process.env.PINECONE_INDEX_NAME!,
  model: openai.embedding("text-embedding-3-small"),
});
