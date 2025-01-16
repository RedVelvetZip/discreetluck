export async function fetcher<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, options);

    // Reusable error handling logic
    await handleResponseError(response);

    // Reusable JSON parsing
    return parseJSON<T>(response);
  } catch (error) {
    console.error("Fetcher error:", error);
    throw error;
  }
}

/**
 * Handle response errors.
 * Throws an error if the response is not OK.
 * @param response The fetch response.
 */
async function handleResponseError(response: Response): Promise<void> {
  if (!response.ok) {
    const errorMessage = `HTTP error! status: ${response.status} - ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 * Parse JSON response safely.
 * @param response The fetch response.
 * @returns The parsed JSON.
 */
async function parseJSON<T>(response: Response): Promise<T> {
  try {
    return await response.json();
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    throw new Error("Invalid JSON response");
  }
}
