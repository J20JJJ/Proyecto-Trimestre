import { ref } from 'vue';
import { defineStore } from 'pinia';

const API_KEY = "AIzaSyAp0V7P3-RZ3tuAviLNFbsHb-q6uPHiGxg";
const URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

async function generateResponse(texto) {
  const prompt = texto;

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
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Error:", data);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export const useConversacionesStore = defineStore('conversaciones', () => {
  // Usamos una referencia para almacenar las conversaciones
  const chats = ref(JSON.parse(localStorage.getItem('conversaciones')) || []);

  // Función para añadir una nueva conversación
  const añadirConversacion = (pregunta, respuesta) => {
    const nuevaConversacion = { pregunta, respuesta };
    chats.value.push(nuevaConversacion);
    // Guardar las conversaciones en localStorage cada vez que se añada una nueva
    localStorage.setItem('conversaciones', JSON.stringify(chats.value));
  };

  // Función para obtener todas las conversaciones
  const obtenerConversaciones = () => {
    return chats.value;
  };

  // Función para eliminar todas las conversaciones
  const eliminarConversaciones = () => {
    chats.value = [];
    // También eliminamos las conversaciones de localStorage
    localStorage.removeItem('conversaciones');
  };

  return { añadirConversacion, obtenerConversaciones, eliminarConversaciones };
});

// Función para preguntar a la IA y guardar la conversación
export const preguntar = async (texto) => {
  const respuesta = await generateResponse(texto);
  const store = useConversacionesStore();

  // Guardar la pregunta y la respuesta en el store
  store.añadirConversacion(texto, respuesta);

  // Retornar la respuesta de la IA
  return respuesta;
};



async function generateResponse(texto) {
  const prompt = texto;

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
    //   console.log(data.candidates[0].content.parts[0].text);
      return data.candidates[0].content.parts[0].text
    } else {
      console.error("Error:", data);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}


const initPromt = `hola, estoy creando un chatbot con ia que consiste en que hablas con un pokemon por mensaje, en este caso es Pikachu, como seria el prompt?
devuélvelo en este formato y solo puedes contestar lo siguiente:

{"prompt":""}`;

export const sacarPromt = async () =>
    guardarID(generateResponse(initPromt))

