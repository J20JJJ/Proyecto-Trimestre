import { ref } from 'vue';
import { defineStore } from 'pinia';

export const ID_pokemon = defineStore('ID_pokemon', () => {
    // Usamos una referencia solo en memoria, sin persistir en localStorage
    const id = ref(null);

    const guardarID = (newToken) => {
        id.value = newToken;
    };

    const getID = () => {
        return id.value;
    };

    const removeID = () => {
        id.value = null;
    };

    return { guardarID, getID, removeID };
});
