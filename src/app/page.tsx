"use client";

import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

const ask = async () => {
  const res = await fetch("/api/answer", {
    method: "POST",
    body: JSON.stringify({ question }),
  });

  const reader = res.body?.getReader();
  const decoder = new TextDecoder();

  let result = "";

  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;

    const chunk = decoder.decode(value);

    const lines = chunk.split("\n");

    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      if (line.includes("[DONE]")) return;

      try {
        const json = JSON.parse(line.replace("data: ", ""));
        const token = json?.choices?.[0]?.delta?.content;

        if (token) {
          result += token;
          setAnswer(result);
        }
      } catch (e) {
      }
    }
  }
};

  return (
    <main className="p-10">
      <h1 className="text-xl font-bold">Mini IA</h1>

      <input
        className="border p-2 w-full mt-4"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button onClick={ask} className="bg-black text-white px-4 py-2 mt-2">
        Preguntar
      </button>

      <p className="mt-4">{answer}</p>
    </main>
  );
}