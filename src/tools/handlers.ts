/**
 * Tool request handlers
 */

import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { DefineSlangArgs, RandomWordArgs } from "../types/index.js";
import {
  fetchDefinitions,
  fetchRandomWord,
  sortByPopularity,
  limitDefinitions,
  UrbanDictionaryError,
} from "../services/urbanDictionary.js";
import {
  formatMultipleDefinitions,
  formatRandomWord,
} from "../utils/formatters.js";
import { DEFAULT_DEFINITION_LIMIT } from "./definitions.js";

/**
 * Handles the define_slang tool request
 * @param args - Tool arguments
 * @returns Tool result with definitions or error
 */
export async function handleDefineSlang(args: DefineSlangArgs): Promise<CallToolResult> {
  const { term, limit = DEFAULT_DEFINITION_LIMIT } = args;

  // Validate input
  if (!term || term.trim().length === 0) {
    return {
      content: [
        {
          type: "text",
          text: "Error: Term is required and cannot be empty.",
        },
      ],
      isError: true,
    };
  }

  try {
    // Fetch definitions from API
    const definitions = await fetchDefinitions(term.trim());

    // Check if any definitions were found
    if (definitions.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No definitions found for "${term}". Try a different term or check the spelling.`,
          },
        ],
      };
    }

    // Sort by popularity and limit results
    const sortedDefinitions = sortByPopularity(definitions);
    const limitedDefinitions = limitDefinitions(sortedDefinitions, limit);

    // Format and return response
    const formattedText = formatMultipleDefinitions(
      term,
      definitions.length,
      limitedDefinitions
    );

    return {
      content: [
        {
          type: "text",
          text: formattedText,
        },
      ],
    };
  } catch (error) {
    if (error instanceof UrbanDictionaryError) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }

    // Unexpected error
    return {
      content: [
        {
          type: "text",
          text: `Unexpected error occurred while looking up "${term}". Please try again.`,
        },
      ],
      isError: true,
    };
  }
}

/**
 * Handles the random_word tool request
 * @param args - Tool arguments (empty)
 * @returns Tool result with random word or error
 */
export async function handleRandomWord(args: RandomWordArgs): Promise<CallToolResult> {
  try {
    // Fetch random word from API
    const definitions = await fetchRandomWord();

    // Check if any definitions were returned
    if (definitions.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "Unable to fetch a random word at this time. Please try again.",
          },
        ],
      };
    }

    // Get the first (most popular) definition
    const randomDefinition = definitions[0];

    // Format and return response
    const formattedText = formatRandomWord(randomDefinition);

    return {
      content: [
        {
          type: "text",
          text: formattedText,
        },
      ],
    };
  } catch (error) {
    if (error instanceof UrbanDictionaryError) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }

    // Unexpected error
    return {
      content: [
        {
          type: "text",
          text: "Unexpected error occurred while fetching a random word. Please try again.",
        },
      ],
      isError: true,
    };
  }
}

/**
 * Routes tool requests to appropriate handlers
 * @param toolName - Name of the tool being called
 * @param args - Tool arguments
 * @returns Tool result
 */
export async function handleToolCall(
  toolName: string,
  args: unknown
): Promise<CallToolResult> {
  switch (toolName) {
    case "define_slang":
      return handleDefineSlang(args as DefineSlangArgs);
    case "random_word":
      return handleRandomWord(args as RandomWordArgs);
    default:
      return {
        content: [
          {
            type: "text",
            text: `Error: Unknown tool "${toolName}"`,
          },
        ],
        isError: true,
      };
  }
}