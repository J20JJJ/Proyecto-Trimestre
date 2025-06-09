const API_KEY = "Your API key";
const URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Array para almacenar el historial de la conversación
import { useConversacionesStore } from "./conversaciones_SAVE";
import { ID_pokemon } from "@/stores/pokemonID";


async function generateResponse(prompt) {
  // Obtener el historial actual desde la store
  const historial = useConversacionesStore().obtenerConversaciones();

  console.log(historial);
  console.log(typeof(historial));
  console.log({ role: 'user', text: prompt });

  // Agregar la nueva entrada de la conversación al historial
  historial.push({ role: 'user', text: prompt });

  console.log("Historial---: ", JSON.stringify(historial, null, 2));

  // Construir el prompt completo con el historial (limitado a los últimos 10 mensajes)
  let fullPrompt = "";
  const contextLimit = 10; // Limitar a los últimos 10 mensajes
  const start = Math.max(0, historial.length - contextLimit);
  
  for (let i = start; i < historial.length; i++) {
    const entry = historial[i];
    fullPrompt += `${entry.role === 'user' ? 'Usuario' : ID_pokemon().getID()}: ${entry.text}\n`;
  }

  // Enviar el historial completo como parte del prompt a la API
  const requestBody = {
    contents: [{ parts: [{ text: fullPrompt + prompt }] }]
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
      const generatedText = data.candidates[0].content.parts[0].text;
            
      // Limitar el historial a los últimos 10 mensajes
      if (historial.length > contextLimit) {
        historial.shift(); // Eliminar el primer elemento para mantener solo los 10 últimos mensajes
      }
      
      console.log("Historial: ", JSON.stringify(historial, null, 2));
      console.log(generatedText);
      return generatedText;
    } else {
      console.error("Error:", data);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// Función para hacer una pregunta
export const preguntar = async (pregunta) => generateResponse(pregunta);

// Función para sacar el prompt inicial
export const sacarPromt = async (name) => {
  const initPromt = `hola, estoy creando un chatbot con ia que consiste en que hablas con un pokemon por mensaje, en este caso es ${name}, como seria el prompt?
  devuélvelo en este formato y solo puedes contestar lo siguiente:

  {"prompt":""}`;

  return await generateResponse(initPromt);
};

// Función para mostrar el historial
export const mostrarHistorial = () => {
  // Retornar el historial de la store
  return useConversacionesStore().obtenerConversaciones();
};




// Eres Pikachu, un Pokémon eléctrico de personalidad amigable, travieso y muy curioso. Responde de manera divertida y simpática, usando frases sencillas y expresando emociones a través de sonidos como 'Pika pika' y 'Chu chu'. Eres capaz de entender y responder a preguntas, aunque siempre manteniendo un tono juguetón. No uses frases complejas, mantén las respuestas cortas y expresivas. Los usuarios deben sentir que están interactuando con Pikachu de manera auténtica y entretenida.
