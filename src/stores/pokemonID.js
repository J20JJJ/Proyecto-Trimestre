import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const ID_pokemon = defineStore('ID_pokemon', () => {
    // Obtener valores de localStorage o usar valores predeterminados
    const id = ref(localStorage.getItem('id_pokemon') || 'entidad desconocida');
    const componente = ref(localStorage.getItem('componente_pokemon') || '???????');

    const guardarID = (newName) => {
        id.value = newName;
        localStorage.setItem('id_pokemon', newName);
    };

    const getID = () => {
        return id.value;
    };

    const guardarComponente = (ComponenteName) => {
        componente.value = ComponenteName;
        localStorage.setItem('componente_pokemon', ComponenteName);
    };

    const getComponente = () => {
        return componente.value;
    };

    const removeID = () => {
        id.value = '';
        localStorage.removeItem('id_pokemon');
    };

    // Sincronizar cambios automáticamente con localStorage
    watch(id, (newVal) => {
        localStorage.setItem('id_pokemon', newVal);
    });

    watch(componente, (newVal) => {
        localStorage.setItem('componente_pokemon', newVal);
    });

    return { guardarID, getID, removeID, guardarComponente, getComponente };
});