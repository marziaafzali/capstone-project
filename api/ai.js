// Example: vite + express or vercel serverless
export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt || prompt.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Missing prompt" }),
        { status: 400 }
      );
    }

    // --- Replace this part with your AI call ---
    const result = `AI Marketing Plan for: ${prompt.slice(0, 50)}...`;
    // ------------------------------------------

    return new Response(
      JSON.stringify({ result }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Server error:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: err.message }),
      { status: 500 }
    );
  }
}
