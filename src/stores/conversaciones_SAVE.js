import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useConversacionesStore = defineStore('conversaciones', () => {
    // Usamos una referencia para almacenar las conversaciones
    const chats = ref([]);

    // Función para añadir una nueva conversación
    const añadirConversacion = (newConversacion) => {
        // Convertimos el mensaje a un formato JSON string
        const conversacionString = JSON.stringify(newConversacion, null, 2);
        
        console.log("conversacionString: ", conversacionString);
        // Guardamos la conversación en el estado (sin localStorage)
        chats.value = conversacionString;
    };

    // Función para obtener todas las conversaciones
    const obtenerConversaciones = () => {
        console.log("chats: ", chats.value);

        if(typeof chats.value === 'string') {
            return JSON.parse(chats.value);
        }

        return chats.value;
    };

    // Función para eliminar todas las conversaciones
    const eliminarConversaciones = () => {
        chats.value = [];
    };

    return { añadirConversacion, obtenerConversaciones, eliminarConversaciones };
});
