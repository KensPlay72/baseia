export async function getEmbedding(text: string): Promise<number[]> {
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

  return data.data[0].embedding;
}