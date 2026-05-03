import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { messages, attachments } = await req.json();
    
    // Use gemini-2.5-flash as the requested "flash" model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: "You are a professional travel assistant. Help the user plan their trips, find destinations, and refine their itineraries. Be concise but enthusiastic and helpful. Use markdown for formatting. You can also analyze files provided by the user via URLs."
    });

    // Format messages for Gemini history
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));
    
    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: history,
    });

    // Handle multimodal parts (text + attachments)
    let parts: any[] = [{ text: lastMessage }];
    if (attachments && attachments.length > 0) {
      attachments.forEach((att: any) => {
        parts.push({ text: `\n[Context: The user attached a file named "${att.name}" accessible at ${att.url}]` });
      });
    }

    const result = await chat.sendMessage(parts);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}
