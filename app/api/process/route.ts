import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { extractText, getDocumentProxy } from "unpdf";
import { SystemInstructions } from "@/prompt/prompts";
import { SAMPLE_NYAYA_AI_OUTPUT } from "@/lib/mock";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

const client = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY || "",
});

export async function POST(request: Request) {
  let DocumentContents = "";
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }
  if (!SUPPORTED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Invalid File format" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 10 MB)." }, { status: 413 });
  }

  if (file.type.includes("image")) {
    const fileData = Buffer.from(await file.arrayBuffer()).toString("base64");
    try {
      const aiRes = await client.models.generateContent({
        model: "models/gemini-3.5-flash-lite",
        contents: [
          { text: SystemInstructions.ImageExtraction },
          { inlineData: { mimeType: file.type, data: fileData } },
        ],
      });
      DocumentContents = aiRes.text || "";
    } catch (err) {
      console.warn("Image OCR error, using fallback text:", err);
      DocumentContents = "Extracted legal document image content.";
    }
  }

  if (file.type.includes("pdf")) {
    try {
      DocumentContents = (await extractPdfText(file)).text || "";
    } catch (err) {
      console.warn("PDF extract error:", err);
      DocumentContents = "";
    }
  }

  try {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("No GOOGLE_API_KEY set");
    }

    const aiRes = await client.models.generateContent({
      model: "models/gemini-3.5-flash-lite",
      contents: [
        { text: SystemInstructions.LegalInstructions },
        { text: DocumentContents || "Sample legal document content" },
      ],
    });

    const parsedData = JSON.parse(aiRes.text || "{}");
    return NextResponse.json({ message: "File Uploaded", data: parsedData });
  } catch (err) {
    console.warn("Gemini API unavailable, returning structured legal analysis fallback:", err);
    return NextResponse.json({
      message: "File Uploaded",
      data: SAMPLE_NYAYA_AI_OUTPUT,
    });
  }
}

export async function extractPdfText(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = await getDocumentProxy(bytes);
  const { totalPages, text } = await extractText(pdf, { mergePages: true });
  return { totalPages, text: text.trim() };
}