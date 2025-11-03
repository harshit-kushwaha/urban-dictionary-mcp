/**
 * Formatting utilities for Urban Dictionary definitions
 */

import { UrbanDefinition } from "../types/index.js";

/**
 * Removes Urban Dictionary's bracket notation used for internal links
 * @param text - Text containing brackets
 * @returns Cleaned text without brackets
 */
export function cleanText(text: string): string {
  return text.replace(/\[|\]/g, "");
}

/**
 * Formats a date string into a readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString();
}

/**
 * Formats a single Urban Dictionary definition for display
 * @param def - Urban Dictionary definition object
 * @param index - Index number for display (0-based)
 * @returns Formatted string ready for display
 */
export function formatDefinition(def: UrbanDefinition, index: number): string {
  const cleanDefinition = cleanText(def.definition);
  const cleanExample = cleanText(def.example);
  const formattedDate = formatDate(def.written_on);

  return `
**Definition ${index + 1}** (👍 ${def.thumbs_up} | 👎 ${def.thumbs_down})
**Word:** ${def.word}
**Author:** ${def.author}
**Definition:** ${cleanDefinition}
**Example:** ${cleanExample}
**Link:** ${def.permalink}
**Date:** ${formattedDate}
---`;
}

/**
 * Formats multiple definitions into a complete response
 * @param term - The search term
 * @param totalCount - Total number of definitions found
 * @param definitions - Array of definitions to format
 * @returns Complete formatted response
 */
export function formatMultipleDefinitions(
  term: string,
  totalCount: number,
  definitions: UrbanDefinition[]
): string {
  const formattedDefs = definitions
    .map((def, idx) => formatDefinition(def, idx))
    .join("\n");

  return `# Definitions for "${term}"

Found ${totalCount} total definitions. Showing top ${definitions.length}:
${formattedDefs}`;
}

/**
 * Formats a random word response
 * @param definition - The random definition
 * @returns Formatted random word response
 */
export function formatRandomWord(definition: UrbanDefinition): string {
  const formatted = formatDefinition(definition, 0);
  return `# Random Word from Urban Dictionary\n${formatted}`;
}