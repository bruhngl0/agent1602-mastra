import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { MCPClient } from "@mastra/mcp";
import * as dotenv from "dotenv";

dotenv.config();

const ytMcp = new MCPClient({
  servers: {
    physcisYtMcp: {
      command: "node",
      args: [
        "/Users/adityasharma/Desktop/developer/agent-rag1602-mcp/mcp-physics/dist/index.js",
      ],
      env: {
        YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY!,
      },
    },
  },
});

export const youtubeSearchAgent = new Agent({
  name: "Youtube search agent",
  instructions: `
   You are a youtube search agent and you will find the relevant videos on the topics you get as arguments
     `,
  model: openai("gpt-4o-mini"),
  tools: await ytMcp.getTools(),
  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db", // path is relative to the .mastra/output directory
    }),
  }),
});
