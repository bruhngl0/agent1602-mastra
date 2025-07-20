import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { MCPClient } from "@mastra/mcp";
import * as dotenv from "dotenv";

dotenv.config();

const webSearchMcp = new MCPClient({
  servers: {
    webSearchMcp: {
      command: "npx",
      args: [
        "-y",
        "mcp-remote",
        `https://mcp.exa.ai/mcp?exaApiKey=${process.env.EXA_API_KEY}`,
      ],
    },
  },
});

export const webSearchAgent = new Agent({
  name: "Web search agent",
  instructions: `
   You are a web search agent and you will find the relevant content on the topics you get as arguments
     `,
  model: openai("gpt-4o-mini"),
  tools: await webSearchMcp.getTools(),
  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db", // path is relative to the .mastra/output directory
    }),
  }),
});
