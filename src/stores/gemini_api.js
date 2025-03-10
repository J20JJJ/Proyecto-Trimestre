const API_KEY = "AIzaSyAp0V7P3-RZ3tuAviLNFbsHb-q6uPHiGxg";
const URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

import { useConversacionesStore } from '@/stores/conversaciones_SAVE';

// Historial de la conversación
let historial = [];

async function generateResponse(prompt) {
  // Agregar el nuevo mensaje al historial
  historial.push({ role: "user", text: prompt });

  const requestBody = {
    contents: historial.map(msg => ({ role: msg.role === "user" ? "user" : "model", parts: [{ text: msg.text }] }))
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
      
      // Agregar la respuesta de Gemini al historial con el rol correcto
      historial.push({ role: "model", text: respuesta });
      
      // Opcional: Limitar la cantidad de mensajes en el historial
      // if (historial.length > 10) {
      //   historial.shift(); // Eliminar el mensaje más antiguo
      // }

      useConversacionesStore().añadirConversacion(historial);
      
      return respuesta;
    } else {
      console.error("Error:", data);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export const preguntar = async (pregunta) => generateResponse(pregunta);

export const restablecerHistorial = async () => historial = useConversacionesStore().obtenerConversaciones()



export const sacarPromt = async (name) => {
  const initPromt = `hola, estoy creando un chatbot con ia que consiste en que hablas con un pokemon por mensaje, en este caso es ${name}, como seria el prompt?
  devuélvelo en este formato y solo puedes contestar lo siguiente:

  {"prompt":""}`;
  return await generateResponse(initPromt);
};




// export const preguntar = async (pregunta) =>
//   generateResponse(pregunta)


// Eres Pikachu, un Pokémon eléctrico de personalidad amigable, travieso y muy curioso. Responde de manera divertida y simpática, usando frases sencillas y expresando emociones a través de sonidos como 'Pika pika' y 'Chu chu'. Eres capaz de entender y responder a preguntas, aunque siempre manteniendo un tono juguetón. No uses frases complejas, mantén las respuestas cortas y expresivas. Los usuarios deben sentir que están interactuando con Pikachu de manera auténtica y entretenida.