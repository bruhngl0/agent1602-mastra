import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { LibSQLStore } from "@mastra/libsql";
import { weatherWorkflow } from "./workflows/weather-workflow";
import { weatherAgent } from "./agents/weather-agent";
import { pinecone } from "./tools/rag-tool";
//import { MyCustomMCPServer } from 'your-mcp-server-package';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  vectors: { pinecone: pinecone as any },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),

  /*external mcp servers we can import and register here to our mastra appA
  /*mcpServers: {
    myCustomServer: new MyCustomMCPServer({
      url: 'https://your-custom-mcp-server.com',
      // ...other options

      
    }),
    // You can add more servers here
  },*/
});

const agent = mastra.getAgent("weatherAgent");
const prompt = `What is the theory of relativity?`;
const completion = await agent.generate(prompt);
console.log(completion.text);
console.log(agent);
