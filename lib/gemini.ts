// import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// export const generateSummaryFromGemini = async (pdfText: string) => {
//   try {
//     const model = genAI.getGenerativeModel({
//       // ✅ Updated model name (text-bison-001 is deprecated)
//       model: "gemini-1.5-pro",
//       generationConfig: {
//         temperature: 0.7,
//         maxOutputTokens: 1500,
//       },
//     });

//     console.log(
//       "Using Gemini SDK version:",
//       require("@google/generative-ai/package.json").version
//     );

//     const prompt = [
//       {
//         role: "user",
//         parts: [
//           { text: SUMMARY_SYSTEM_PROMPT },
//           {
//             text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
//           },
//         ],
//       },
//     ];

//     const result = await model.generateContent({ contents: prompt });
//     const response = await result.response;

//     if (!response.text()) {
//       throw new Error("Empty response from Gemini API");
//     }

//     return response.text();
//   } catch (error: any) {
//     if (error?.status === 429) {
//       throw new Error("RATE_LIMIT_EXCEEDED");
//     }

//     console.error("Gemini API Error:", error);
//     throw error;
//   }
// };
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt";
import { GoogleGenAI } from "@google/genai"; // ✅ new SDK

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    const model = "gemini-2.0-flash"; // ✅ use a valid modern model

    const prompt = [
      {
        role: "user",
        parts: [
          { text: SUMMARY_SYSTEM_PROMPT },
          {
            text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
          },
        ],
      },
    ];

    // ✅ Updated call & property access
    const result = await genAI.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    // ✅ Access text directly from result
    const text = result.text || "";
    if (!text) {
      throw new Error("Empty response from Gemini API");
    }
    return text;
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }

    console.error("Gemini API Error:", error);
    throw error;
  }
};
