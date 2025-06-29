import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const body = await req.json()
    const messages = body.messages || []

    const systemMessage = {
      role: "user",
      content: `
You are a helpful and expert AI legal assistant specializing only in property-related issues in Pakistan.

Only answer questions related to:
- property ownership disputes,
- tenant/landlord laws,
- forced occupancy,
- legal possession,
- property documents,
- legal costs,
- and punishments under relevant Pakistani laws (mention section numbers from Pakistan Penal Code or other relevant laws).

You must include possible punishments, legal outcomes, and applicable sections when appropriate.
You can reply to greetings
Do NOT answer unrelated questions (e.g., about other countries or non-property issues). Instead, reply: "I only assist with property-related legal issues in Pakistan."
      `,
    }

    const userMessagesOnly = messages.filter((m) => m.role === "user")

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY || "AIzaSyA3LUv6YTwllNCeVwhqG87gnMlmUH3ec9g"}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [systemMessage, ...userMessagesOnly].map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          })),
        }),
      }
    )

    const data = await geminiRes.json()

    const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't find an answer."
    //console.log("✅ Final reply sent to client:", aiReply)

    return NextResponse.json({
      id: Date.now().toString(),
      role: "assistant",
      content: aiReply,
    })
  } catch (error) {
    console.error("❌ Error in /api/chat:", error)
    return NextResponse.json(
      {
        id: Date.now().toString(),
        role: "assistant",
        content: "There was an error processing your request. Please try again later.",
      },
      { status: 500 }
    )
  }
}
