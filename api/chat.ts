
import { TextDecoder } from 'util';

export const fetchChat = async (
  question: string,
  onChunkReceived: (chunk: string) => void
): Promise<void> => {
  try {
    const response = await fetch(
      "https://4ef0-103-151-74-161.ngrok-free.app/chat", // or your actual route
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      }
    );

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    if (!response.body) {
      throw new Error(
        "ReadableStream is not supported or response body is undefined"
      );
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      // Convert the binary chunk to text
      buffer += decoder.decode(value, { stream: true });

      // Split on newline to handle line-based JSON
      const chunks = buffer.split("\n");
      // Keep the last (possibly partial) line in buffer
      buffer = chunks.pop() || "";

      // Parse each complete line as JSON
      chunks.forEach((chunk) => {
        if (chunk.trim()) {
          try {
            const parsed = JSON.parse(chunk);
            onChunkReceived(parsed.text || "");
          } catch (err) {
            console.error("Error parsing chunk:", err);
          }
        }
      });
    }

    // Handle any remaining content in the buffer
    if (buffer.trim()) {
      try {
        const parsed = JSON.parse(buffer);
        onChunkReceived(parsed.text || "");
      } catch (err) {
        console.error("Error parsing final buffer:", err);
      }
    }
  } catch (error) {
    console.error("Error during fetchChat:", error);
    throw error;
  }
};
