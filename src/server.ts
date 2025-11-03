/**
 * MCP Server initialization and configuration
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { ALL_TOOLS, handleToolCall } from "./tools/index.js";

/**
 * Server metadata
 */
const SERVER_NAME = "urban-dictionary-mcp";
const SERVER_VERSION = "1.0.1";

/**
 * Creates and configures the MCP server instance
 * @returns Configured Server instance
 */
export function createServer(): Server {
  const server = new Server(
    {
      name: SERVER_NAME,
      version: SERVER_VERSION,
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Register tool list handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: ALL_TOOLS,
    };
  });

  // Register tool call handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    return await handleToolCall(name, args);
  });

  return server;
}

/**
 * Gets server information for logging
 * @returns Server info object
 */
export function getServerInfo() {
  return {
    name: SERVER_NAME,
    version: SERVER_VERSION,
    tools: ALL_TOOLS.map((tool) => tool.name),
  };
}