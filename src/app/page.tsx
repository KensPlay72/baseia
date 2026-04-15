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

    const data = await res.json();
    setAnswer(data.answer);
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