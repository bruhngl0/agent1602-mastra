import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { MCPClient } from "@mastra/mcp";
import * as dotenv from "dotenv";

dotenv.config();

const ankiMcpClient = new MCPClient({
  servers: {
    "anki-connect-mcp": {
      command: "node",
      args: [
        "/Users/adityasharma/Developer/ai-apps/mcp-servers/anki-connect-mcp/dist/index.js",
      ],
      env: {},
    },
  },
});

export const ankiMcp = new Agent({
  name: "Anki notes making agent",
  instructions: `
   You are a Anki connect and you will find the relevant content and help user with notes and flash cards"
     `,
  model: openai("gpt-4o-mini"),
  tools: await ankiMcpClient.getTools(),
  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db", // path is relative to the .mastra/output directory
    }),
  }),
});
