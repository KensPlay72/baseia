import { NextResponse } from "next/server";
import { buildIndex, search } from "@/lib/search";

let initialized = false;

export async function POST(req: Request) {
  const { question } = await req.json();

  if (!initialized) {
    await buildIndex();
    initialized = true;
  }

  const results = await search(question);

  const context = results.map(r => r.content).join("\n");

  const aiRes = await fetch(`${process.env.AI_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.AI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Responde SOLO con la información proporcionada.",
        },
        {
          role: "user",
          content: `Contexto:\n${context}\n\nPregunta: ${question}`,
        },
      ],
    }),
  });

  const data = await aiRes.json();

  return NextResponse.json({
    answer: data.choices[0].message.content,
    sources: results.map(r => r.source),
  });
}