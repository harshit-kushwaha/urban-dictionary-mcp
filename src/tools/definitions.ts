/**
 * Tool definitions for MCP server
 */

import { Tool } from "@modelcontextprotocol/sdk/types.js";

/**
 * Default limit for number of definitions to return
 */
export const DEFAULT_DEFINITION_LIMIT = 3;

/**
 * Tool for looking up slang definitions
 */
export const DEFINE_SLANG_TOOL: Tool = {
  name: "define_slang",
  description:
    "Look up the definition of a slang term or phrase on Urban Dictionary. " +
    "Returns multiple definitions sorted by popularity (thumbs up). " +
    "Use this when users ask about slang, internet terminology, or modern colloquialisms.",
  inputSchema: {
    type: "object",
    properties: {
      term: {
        type: "string",
        description: "The slang term or phrase to look up (e.g., 'rizz', 'ghosting', 'bussin')",
      },
      limit: {
        type: "number",
        description: `Maximum number of definitions to return (default: ${DEFAULT_DEFINITION_LIMIT})`,
        default: DEFAULT_DEFINITION_LIMIT,
        minimum: 1,
        maximum: 10,
      },
    },
    required: ["term"],
  },
};

/**
 * Tool for getting a random slang word
 */
export const RANDOM_WORD_TOOL: Tool = {
  name: "random_word",
  description:
    "Get a random slang word and its definition from Urban Dictionary. " +
    "Great for discovering new slang terms or when users want to learn something new.",
  inputSchema: {
    type: "object",
    properties: {},
  },
};

/**
 * Array of all available tools
 */
export const ALL_TOOLS: Tool[] = [DEFINE_SLANG_TOOL, RANDOM_WORD_TOOL];