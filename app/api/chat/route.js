import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/getAuthUser"

const MAX_HISTORY = 20
const MAX_MESSAGE_LENGTH = 4000

// Gemini expects a conversation that starts with the user and alternates roles,
// so drop any leading assistant greeting and merge consecutive same-role turns.
function toGeminiContents(messages) {
  const contents = []
  for (const msg of messages.slice(-MAX_HISTORY)) {
    if (typeof msg?.content !== "string" || !msg.content.trim()) continue
    const role = msg.role === "user" ? "user" : "model"
    if (contents.length === 0 && role === "model") continue
    const text = msg.content.slice(0, MAX_MESSAGE_LENGTH)
    const last = contents[contents.length - 1]
    if (last && last.role === role) {
      last.parts[0].text += "\n\n" + text
    } else {
      contents.push({ role, parts: [{ text }] })
    }
  }
  return contents
}

export async function POST(req) {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json(
        { id: Date.now().toString(), role: "assistant", content: "Please log in to use the AI assistant." },
        { status: 401 }
      )
    }

    const body = await req.json()
    const messages = Array.isArray(body.messages) ? body.messages : []

    if (!process.env.GEMINI_API_KEY) {
      console.error("❌ GEMINI_API_KEY not configured")
      return NextResponse.json(
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "AI service is currently unavailable. Please try again later.",
        },
        { status: 503 }
      )
    }

    const systemPrompt = `
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
      `

    const contents = toGeminiContents(messages)
    if (contents.length === 0) {
      return NextResponse.json(
        { id: Date.now().toString(), role: "assistant", content: "Please enter a question." },
        { status: 400 }
      )
    }

    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents,
        }),
      }
    )

    if (!geminiRes.ok) {
      console.error("❌ Gemini API error:", geminiRes.status, geminiRes.statusText)
      return NextResponse.json(
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "I'm having trouble connecting to my knowledge base. Please try again in a moment.",
        },
        { status: 503 }
      )
    }

    const data = await geminiRes.json()

    const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't find an answer."

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
