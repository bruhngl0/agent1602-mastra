import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { LibSQLStore } from "@mastra/libsql";
import { weatherWorkflow } from "./workflows/weather-workflow";
import { physicsTutorAgent } from "./agents/physics-agent";
import { pinecone } from "./tools/rag-tool";
import { youtubeSearchAgent } from "./agents/youtube-agent";
import { webSearchAgent } from "./agents/search-agent";
//import { MyCustomMCPServer } from 'your-mcp-server-package';

export const mastra = new Mastra({
  // workflows: { weatherWorkflow },
  agents: { physicsTutorAgent, youtubeSearchAgent, webSearchAgent },
  vectors: { pinecone: pinecone as any },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
});
