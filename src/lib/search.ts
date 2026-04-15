export function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  return dot / (magA * magB);
}

import { getEmbedding } from "./embeddings";
import { loadDocuments } from "./loader";

let index: any[] = [];

export async function buildIndex() {
  const docs = loadDocuments();

  index = await Promise.all(
    docs.map(async (doc) => ({
      ...doc,
      embedding: await getEmbedding(doc.content),
    }))
  );
}

export async function search(query: string, topK = 3) {
  const queryEmbedding = await getEmbedding(query);

  const scored = index.map((item) => ({
    ...item,
    score: cosineSimilarity(queryEmbedding, item.embedding),
  }));

  return scored.sort((a, b) => b.score - a.score).slice(0, topK);
}