const API_KEY = "AIzaSyAp0V7P3-RZ3tuAviLNFbsHb-q6uPHiGxg";
const URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

async function generateResponse(prompt) {
  // const prompt = "Hola, bueans tardes";

  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (response.ok) {
      const respuesta = data.candidates[0].content.parts[0].text;
      console.log(respuesta);
      return respuesta;
    } else {
      console.error("Error:", data);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}




export const sacarPromt = async (name) => {
  const initPromt = `hola, estoy creando un chatbot con ia que consiste en que hablas con un pokemon por mensaje, en este caso es ${name}, como seria el prompt?
  devuélvelo en este formato y solo puedes contestar lo siguiente:

  {"prompt":""}`;
  return await generateResponse(initPromt);
};




export const preguntar = async (pregunta) =>
  generateResponse(pregunta)
