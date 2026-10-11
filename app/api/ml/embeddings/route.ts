import { NextResponse } from "next/server";
import { getHuggingFaceEmbedding, computeCosineSimilarity } from "@/lib/ml";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query = "", targetTexts = [] } = body;

    if (!query) {
      return NextResponse.json({ error: "Query text is required." }, { status: 400 });
    }

    const queryEmbed = await getHuggingFaceEmbedding(query);

    const scoredResults = await Promise.all(
      targetTexts.map(async (text: string, index: number) => {
        const textEmbed = await getHuggingFaceEmbedding(text);
        const similarity = computeCosineSimilarity(queryEmbed.vector, textEmbed.vector);
        return {
          index,
          text,
          cosineSimilarity: Math.round(similarity * 1000) / 1000,
          similarityPercent: Math.round(similarity * 1000) / 10,
        };
      })
    );

    return NextResponse.json({
      modelUsed: queryEmbed.model,
      vectorDimensions: queryEmbed.vector.length,
      query,
      results: scoredResults,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "ML embedding error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
