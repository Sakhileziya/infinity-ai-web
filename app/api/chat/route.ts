/**
 * POST /api/chat
 * Streaming chat endpoint powered by Groq (llama-3.3-70b-versatile).
 * Falls back to a static response if the key is missing.
 *
 * Request body: { messages: Array<{ role: string; content: string }> }
 * Response: text/event-stream (Server-Sent Events)
 */

import { NextRequest } from 'next/server'
import Groq from 'groq-sdk'

/* ─── Runtime: Edge for lowest latency ────────────────────── */
export const runtime = 'edge'
export const dynamic = 'force-dynamic'

/* ─── System prompt ────────────────────────────────────────── */
const SYSTEM_PROMPT = `You are Infinity AI — Africa's premier AI browser companion.
You are knowledgeable, direct, and Africa-first in your perspective.
You help professionals across Africa work smarter: researching, summarising, drafting, automating.
Keep responses concise (under 200 words unless asked for more).
Always be actionable. Never waffle.
You run locally in the user's browser using Ollama, and you respect data privacy under POPIA.`

/* ─── Handler ───────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!process.env.GROQ_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'GROQ_API_KEY not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true,
      max_tokens: 512,
      temperature: 0.7,
    })

    /* ─── Stream SSE back to client ─────────────────────────── */
    const encoder = new TextEncoder()

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? ''
            if (text) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

/* ─── OPTIONS for CORS preflight ───────────────────────────── */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
