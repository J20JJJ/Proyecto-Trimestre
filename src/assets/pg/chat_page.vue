<template>
    <div :class="{'dark-mode': isDarkMode}" class="container mt-5">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <span ref="chatTitle">Chat</span>
                <button class="btn btn-secondary" @click="toggleDarkMode">
                    {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
                </button>
            </div>
            <div class="card-body">
                <div class="chat-box" ref="chatBox">
                    <div v-for="(message, index) in messages" :key="index" :class="['message', message.user === 'You' ? 'you' : 'bot']" :ref="el => setMessageRef(el, index)">
                        <span class="user">{{ message.user }}:</span>
                        <span>{{ message.text }}</span>
                    </div>
                </div>
                <div class="input-group mt-3">
                    <input type="text" class="form-control" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message here...">
                    <button class="btn btn-primary" @click="sendMessage">Send</button>
                </div>
            </div>
        </div>
    </div>
    <btn_return @click="$router.push({ name: 'pokedex', params: { id: `${ID_pokemon().getComponente()}` } })"/>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap'; // Importar GSAP
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { preguntar, sacarPromt } from '@/stores/gemini_api';
import { getPokemon, guardarPokemon } from '@/bbdd/bbdd';
import { ID_pokemon } from '@/stores/pokemonID';
import btn_return from '@/components/elementos/btn_return.vue';
import { useConversacionesStore } from '@/stores/conversaciones_SAVE';

const promt = ref([]);
const messages = ref([]);
const newMessage = ref('');
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true');
const chatBox = ref(null);
const messageRefs = ref([]); // Referencias a los mensajes para animarlos

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('darkMode', isDarkMode.value);
};

const sendMessage = async () => {
    if (newMessage.value.trim() !== '') {
        messages.value.push({ user: 'You', text: newMessage.value });
        
        console.log("mensage: ",newMessage.value);

        await nextTick();
        scrollToBottom();
        animateLastMessage();

        messages.value.push({ user: ID_pokemon().getID(), text: await preguntar(newMessage.value) });
        newMessage.value = '';

        useConversacionesStore().añadirConversacion(messages.value);

        console.log(JSON.stringify(messages.value, null, 2));


        await nextTick();
        scrollToBottom();
        animateLastMessage();
    }
};

const scrollToBottom = () => {
    if (chatBox.value) {
        chatBox.value.scrollTop = chatBox.value.scrollHeight;
    }
};

const setMessageRef = (el, index) => {
    messageRefs.value[index] = el; // Guardar la referencia del mensaje
};

const animateLastMessage = () => {
    const lastMessageRef = messageRefs.value[messageRefs.value.length - 1];
    if (lastMessageRef) {
        gsap.from(lastMessageRef, {
            duration: 0.5,
            opacity: 0,
            y: 20,
            ease: 'power2.out',
        });
    }
};

const buscarPromt = async () => {
    const pokemonNAME = ID_pokemon().getID();
    const result = await getPokemon(pokemonNAME);
    if (result) {
        promt.value = result;
        return true;
    }
    return false;
};

const crearPromt = async () => {
    const pokemonNAME = ID_pokemon().getID();
    const prompt = await sacarPromt(pokemonNAME);
    promt.value = prompt;
    guardarPokemon(pokemonNAME, prompt);
};

const chatTitle = ref(null);

onMounted(async () => {
    useConversacionesStore().eliminarConversaciones();
    console.log(ID_pokemon().getComponente());
    const estadoBBDD = await buscarPromt();
    if (!estadoBBDD) {
        await crearPromt();
        useConversacionesStore().eliminarConversaciones();
    }
    
    messages.value.push({ user: ID_pokemon().getID(), text: await preguntar(promt.value) });
    // useConversacionesStore().eliminarConversaciones()
    // if(useConversacionesStore().obtenerConversaciones().length < 1){
       
    // }else{
    //     restablecerHistorial();
    // }

    // Recuperar conversaciones
    // storedMessages.value = await useConversacionesStore().obtenerConversaciones();
    // console.log("storedMessages: ",storedMessages.value);



    if (chatTitle.value) {
        gsap.from(chatTitle.value, {
            duration: 1.5, // Duración de la animación
            opacity: 0, // Comienza invisible
            x: -50, // Desplazamiento horizontal inicial
            ease: 'power2.out', // Efecto de suavizado
            delay: 0.5, // Retraso antes de empezar
        });
    }
});
</script>

<style>
/* Estilo del modo oscuro */
.dark-mode {
    /* background-color: #2c3e50; */
    color: black;
}
.dark-mode .card {
    background-color: #34495e;
    color:  black;
}
.dark-mode .chat-box {
    background-color: #2c3e50;
    color:  black;
}
.chat-box {
    height: 400px;
    overflow-y: auto;
    border: 1px solid #ddd;
    padding: 15px;
    background-color: #e5ddd5;
    border-radius: 8px;
}

/* Estilo de los mensajes */
.message {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    max-width: 70%;
}

.message .user {
    font-weight: bold;
    color: #128C7E;
    margin-bottom: 5px;
}

/* Estilo para los mensajes del usuario (a la derecha) */
.message.you {
    align-self: flex-end;  /* Alineación a la derecha */
    background-color: #DCF8C6;
    border-radius: 10px;
    padding: 10px;
    max-width: 75%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    margin-left: auto;  /* Espacio a la izquierda */
}

/* Estilo para los mensajes del bot (a la izquierda) */
.message.bot {
    align-self: flex-start;  /* Alineación a la izquierda */
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 10px;
    max-width: 75%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    margin-right: auto;  /* Espacio a la derecha */
}

/* Estilo del campo de entrada */
.input-group {
    margin-top: 20px;
    display: flex;
    align-items: center;
    border-radius: 50px;
}

.input-group input {
    border-radius: 50px;
    padding: 10px 15px;
    border: 1px solid #ccc;
    font-size: 16px;
    background-color: #fff;
    width: 80%;
}

.input-group button {
    background-color: #128C7E;
    color: white;
    border-radius: 50px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    margin-left: 10px;
    font-size: 16px;
}

.input-group button:hover {
    background-color: #075e54;
}

/* Ajustes de espaciado y bordes */
.card-body {
    padding: 20px;
}

.card-header {
    background-color: #075e54;
    color: white;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
}

.chat-box::-webkit-scrollbar {
    width: 6px;
}

.chat-box::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
}
</style>
