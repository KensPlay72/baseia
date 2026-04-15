const cache = new Map<string, number[]>();

export async function getEmbedding(text: string): Promise<number[]> {
  const key = text.trim().toLowerCase();

  if (cache.has(key)) {
    console.log("CACHE HIT:", key);
    return cache.get(key)!;
  }

  console.log("CACHE MISS:", key);

  const res = await fetch(`${process.env.AI_BASE_URL}/embeddings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.AI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: text,
      model: "text-embedding-3-small",
    }),
  });

  const data = await res.json();
  const embedding = data.data[0].embedding;

  cache.set(key, embedding);

  return embedding;
}