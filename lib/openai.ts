// import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt";
// import OpenAI from "openai";

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function generateSummaryFromOpenAI(pdfText: string) {
//   try {
//     const response = await client.responses.create({
//       model: "gpt-4o",
//       input: [
//         {
//           role: "system",
//           content: SUMMARY_SYSTEM_PROMPT,
//         },
//         {
//           role: "user",
//           content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
//         },
//       ],
//       temperature: 0.7,
//       max_output_tokens: 1500,
//     });
//     return response.output_text;
//   } catch (err: any) {
//     if (err?.status === 429) {
//       throw new Error("RATE_LIMIT_EXCEEDED");
//     }
//     throw err;
//   }
// }

import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateSummaryFromOpenAI(pdfText: string) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SUMMARY_SYSTEM_PROMPT },
        { role: "user", content: pdfText },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return response.choices[0].message?.content;
  } catch (error) {
    console.error("Error generating summary:", error);
    throw error;
  }
}
