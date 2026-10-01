import { NextResponse } from 'next/server';
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// Hardcoded knowledge base for MVP
const complianceDocuments = [
  "Tariffs for importing electronics into Germany: The base import duty for electronics (HS Code 8517) is generally 0%. However, a standard Value Added Tax (VAT) of 19% applies.",
  "Compliance requirements for electronics in the EU: Products must adhere to the RoHS Directive (Restriction of Hazardous Substances) and carry the CE marking indicating health, safety, and environmental protection standards.",
  "Exporting agricultural goods to Japan requires strict phytosanitary certificates. Tariffs on processed foods can range from 10% to 25% depending on the sugar content."
];

export async function POST(request) {
  return new Response("Not Found", { status: 404 });
  try {
    const body = await request.json();
    const { text } = body;

    // 1. Initialize OpenAI Model
    const model = new ChatOpenAI({
      modelName: "gpt-4o-mini", // Fast model
      temperature: 0.2,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    // 2. Prepare Context
    // Instead of a complex VectorStore for the MVP, we just combine the knowledge base 
    // since it easily fits in the context window.
    const contextString = complianceDocuments.join("\n\n");

    // 3. Create System Prompt
    const systemTemplate = `You are the LexBorder AI General Counsel, an expert in international trade compliance, tariffs, and cross-border law.
Use the following pieces of retrieved legal context to answer the user's question accurately.
If you don't know the answer based on the context, say "I don't have enough specific legal context to answer that confidently, but I can offer general advice."
Keep your answer professional, concise, and easy to read.

Context:
{context}`;

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["human", "{input}"],
    ]);

    // 4. Create Chain and Invoke
    const chain = prompt.pipe(model);
    
    const response = await chain.invoke({
      context: contextString,
      input: text
    });

    return NextResponse.json({ reply: response.content });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { reply: `Detailed Error: ${error.message}` },
      { status: 500 }
    );
  }
}
