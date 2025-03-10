import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useConversacionesStore = defineStore('conversaciones', () => {
    // Usamos una referencia para almacenar las conversaciones
    const chats = ref(localStorage.getItem('conversaciones') || []);

    // Función para añadir una nueva conversación
    const añadirConversacion = (newConversacion) => {
        chats.value = newConversacion;
        localStorage.setItem('conversaciones',  chats.value);
    };
    

    // Función para obtener todas las conversaciones
    const obtenerConversaciones = () => {
        console.log("chats: ", chats.value);
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
