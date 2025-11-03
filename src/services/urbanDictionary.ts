/**
 * Service layer for interacting with Urban Dictionary API
 */

import axios, { AxiosError } from "axios";
import { UrbanAPIResponse, UrbanDefinition } from "../types/index.js";

const URBAN_API_BASE = "https://api.urbandictionary.com/v0";

/**
 * Custom error class for Urban Dictionary API errors
 */
export class UrbanDictionaryError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = "UrbanDictionaryError";
  }
}

/**
 * Fetches definitions for a given term from Urban Dictionary
 * @param term - The slang term to look up
 * @returns Array of definitions
 * @throws UrbanDictionaryError if the API request fails
 */
export async function fetchDefinitions(term: string): Promise<UrbanDefinition[]> {
  try {
    const response = await axios.get<UrbanAPIResponse>(`${URBAN_API_BASE}/define`, {
      params: { term },
      timeout: 5000, // 5 second timeout
    });

    return response.data.list || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new UrbanDictionaryError(
        `Failed to fetch definitions for "${term}": ${axiosError.message}`,
        error
      );
    }
    throw new UrbanDictionaryError(
      `Unexpected error while fetching definitions for "${term}"`,
      error as Error
    );
  }
}

/**
 * Fetches a random word and its definitions from Urban Dictionary
 * @returns Array of definitions for a random word
 * @throws UrbanDictionaryError if the API request fails
 */
export async function fetchRandomWord(): Promise<UrbanDefinition[]> {
  try {
    const response = await axios.get<UrbanAPIResponse>(`${URBAN_API_BASE}/random`, {
      timeout: 5000, // 5 second timeout
    });

    return response.data.list || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new UrbanDictionaryError(
        `Failed to fetch random word: ${axiosError.message}`,
        error
      );
    }
    throw new UrbanDictionaryError(
      "Unexpected error while fetching random word",
      error as Error
    );
  }
}

/**
 * Sorts definitions by popularity (thumbs_up count)
 * @param definitions - Array of definitions to sort
 * @returns Sorted array (descending by thumbs_up)
 */
export function sortByPopularity(definitions: UrbanDefinition[]): UrbanDefinition[] {
  return [...definitions].sort((a, b) => b.thumbs_up - a.thumbs_up);
}

/**
 * Limits the number of definitions returned
 * @param definitions - Array of definitions
 * @param limit - Maximum number to return
 * @returns Sliced array
 */
export function limitDefinitions(
  definitions: UrbanDefinition[],
  limit: number
): UrbanDefinition[] {
  return definitions.slice(0, limit);
}