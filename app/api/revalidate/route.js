import { revalidateTag } from "next/cache";

const API_KEY = process.env.CACHE_API_KEY;

export async function GET(request) {
  // Extract the API key from the request headers
  const apiKey = request.headers.get("X-API-Key");

  // Check if the API key matches the expected key
  if (apiKey !== API_KEY) {
    // If the API key is invalid, return a 401 Unauthorized response
    return new Response("Unauthorized", { status: 401 });
  }
  const tag = request.nextUrl.searchParams.get("tag");
  revalidateTag(tag);
  const now = new Date();
  const formattedDate = now.toISOString();

  return Response.json({ tag: tag, revalidated: true, date: formattedDate });
}