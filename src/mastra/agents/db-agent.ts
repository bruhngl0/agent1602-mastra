import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { MCPClient } from "@mastra/mcp";
import * as dotenv from "dotenv";

dotenv.config();

const dbMcp = new MCPClient({
  servers: {
    neonDbMcp: {
      command: "npx",
      args: ["-y", "mcp-remote", "https://mcp.neon.tech/sse"],
    },
  },
});

export const neonDb = new Agent({
  name: "Database Agent",
  instructions: `
   You are a Database agent agent and you will perform the CRUD operations on my database
     `,
  model: openai("gpt-4o-mini"),
  tools: await dbMcp.getTools(),
  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db", // path is relative to the .mastra/output directory
    }),
  }),
});
