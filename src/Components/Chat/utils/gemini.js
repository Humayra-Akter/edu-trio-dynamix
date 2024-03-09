const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const MODEL_NAME = process.env.MODEL_NAME || "gemini-1.0-pro-001";
const API_KEY =
  process.env.API_KEY || "AIzaSyC06-xgOp2mN9G9A_XLVQ7zkS8Cj1-cI7s";

async function runChat(history, input) {
  console.log(history);
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 4096,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: history,
  });

  const result = await chat.sendMessage(input);
  const response = result.response;
  if (response["candidates"][0]["content"]["parts"][0]["text"] === undefined)
    return "আমি আপনার কথা বুঝতে পারছি না। আপনি আবার চেষ্টা করুন।";
  return response["candidates"][0]["content"]["parts"][0]["text"];
}

export default runChat;
