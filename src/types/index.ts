/**
 * Type definitions for Urban Dictionary MCP Server
 */

/**
 * Represents a single definition entry from Urban Dictionary API
 */
export interface UrbanDefinition {
  definition: string;
  permalink: string;
  thumbs_up: number;
  author: string;
  word: string;
  defid: number;
  current_vote: string;
  written_on: string;
  example: string;
  thumbs_down: number;
}

/**
 * Response structure from Urban Dictionary API
 */
export interface UrbanAPIResponse {
  list: UrbanDefinition[];
}

/**
 * Arguments for the define_slang tool
 */
export interface DefineSlangArgs {
  term: string;
  limit?: number;
}

/**
 * Arguments for the random_word tool (empty for now)
 */
export interface RandomWordArgs {
  // No arguments needed
}