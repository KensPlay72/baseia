import fs from "fs";
import path from "path";
import { chunkText } from "./chunker";

export function loadDocuments() {
  const dir = path.join(process.cwd(), "src/data");
  const files = fs.readdirSync(dir);

  let docs: { content: string; source: string }[] = [];

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const text = fs.readFileSync(fullPath, "utf-8");

    const chunks = chunkText(text);

    docs.push(
      ...chunks.map((chunk) => ({
        content: chunk,
        source: file,
      }))
    );
  }

  return docs;
}