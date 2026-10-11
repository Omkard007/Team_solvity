import { NextResponse } from "next/server";
import { GoogleGenAI } from '@google/genai';
import type { Interactions } from '@google/genai';

const client = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY || '',
});
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
}