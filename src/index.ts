#!/usr/bin/env node

/**
 * Urban Dictionary MCP Server
 * 
 * A Model Context Protocol server that provides access to Urban Dictionary's
 * slang definitions through a chat-based interface.
 * 
 * @author Your Name
 * @license MIT
 */

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer, getServerInfo } from "./server.js";

/**
 * Main entry point for the MCP server
 */
async function main() {
  try {
    // Create server instance
    const server = createServer();
    
    // Get server info for logging
    const serverInfo = getServerInfo();
    
    // Create stdio transport
    const transport = new StdioServerTransport();
    
    // Connect server to transport
    await server.connect(transport);
    
    // Log startup information to stderr (stdout is used for MCP protocol)
    console.error("Urban Dictionary MCP Server started successfully");
    console.error(`Server: ${serverInfo.name} v${serverInfo.version}`);
    console.error(`Available tools: ${serverInfo.tools.join(", ")}`);
    console.error("Listening on stdio...");
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

// Start the server
main();