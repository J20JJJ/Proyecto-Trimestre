import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useConversacionesStore = defineStore('conversaciones', () => {
    // Usamos una referencia para almacenar las conversaciones
    const chats = ref(JSON.parse(localStorage.getItem('conversaciones')) || []);

    // Función para añadir una nueva conversación
    const añadirConversacion = (newConversacion) => {
        chats.value.push(newConversacion);
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
