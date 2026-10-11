import { NextResponse } from "next/server";
import { GoogleGenAI } from '@google/genai';
<<<<<<< HEAD
import type { Interactions } from '@google/genai';
=======
import { extractText, getDocumentProxy } from "unpdf";
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
import { SystemInstructions } from "@/prompt/prompts";
>>>>>>> 400e29e56c8ee22766cc431c124e5023890ee4a2

const client = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY || '',
});
<<<<<<< HEAD
const generationConfig = {
    max_output_tokens:5000,
    thinking_level: 'medium',
};

export async function GET(request: Request) {
     const interaction = await client.interactions.create({
        model: 'models/gemini-3.8-flash',
        input: 'tell me about Ai',
        generation_config: generationConfig,
    });
    console.log(interaction.steps?.at(-1));

    return NextResponse.json({ message: "Hello from the API!",response: interaction.steps?.at(-1) });
=======


export async function POST(request: Request) {
    let DocumentContents = ''
    const formData = await request.formData()
    const file = formData.get("file")
    const fileData = Buffer.from(await (file as File).arrayBuffer()).toString("base64")

    // console.log(file,fileData)

    if (!(file instanceof File)) {
        return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }
    if (!SUPPORTED_TYPES.includes(file.type)) return NextResponse.json({ error: "Invalid File format" }, { status: 400 })
    if (file.size > MAX_SIZE) {
        return NextResponse.json({ error: "File too large (max 10 MB)." }, { status: 413 });
    }

    if (file.type.includes("image")) {
        let aiRes = await client.models.generateContent({
            model: "models/gemini-3.5-flash-lite",
            contents: [
                { text: SystemInstructions.ImageExtraction },
                { inlineData: { mimeType: file.type, data: fileData } },
            ],
        })
        DocumentContents = aiRes.text || ""
    }
    if (file.type.includes("pdf")) {
        DocumentContents = (await extractPdfText(file)).text || ""
    }

    const aiRes = await client.models.generateContent({
        model: "models/gemini-3.5-flash-lite",
        contents: [
            { text: SystemInstructions.LegalInstructions },
            { text: DocumentContents }
        ]
    })

    return NextResponse.json({ message: "File Uploaded", data: JSON.parse(aiRes.text || "") });
}





export async function extractPdfText(file: File) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const pdf = await getDocumentProxy(bytes);
    const { totalPages, text } = await extractText(pdf, { mergePages: true });
    return { totalPages, text: text.trim() };
>>>>>>> 400e29e56c8ee22766cc431c124e5023890ee4a2
}