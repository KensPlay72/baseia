const cache = new Map<string, number[]>();

export async function getEmbedding(text: string): Promise<number[]> {
  if (cache.has(text)) {
    return cache.get(text)!;
  }

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

  cache.set(text, embedding);

  return embedding;
}