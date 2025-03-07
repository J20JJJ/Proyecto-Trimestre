<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                Chat
            </div>
            <div class="card-body">
                <div class="chat-box" ref="chatBox">
                    <div v-for="(message, index) in messages" :key="index" class="message">
                        <strong>{{ message.user }}:</strong> {{ message.text }}
                    </div>
                </div>
                <div class="input-group mt-3">
                    <input type="text" class="form-control" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message here...">
                    <button class="btn btn-primary" @click="sendMessage">Send</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { preguntar,sacarPromt } from '@/stores/gemini_api';

const messages = ref([]);
const newMessage = ref('');

const sendMessage = async () => {
    if (newMessage.value.trim() !== '') {
        messages.value.push({ user: 'You', text: newMessage.value });
        messages.value.push({ user: 'Pokemon', text:  await preguntar(newMessage.value)  });
        newMessage.value = '';
        scrollToBottom();
    }
};

const scrollToBottom = () => {
    const chatBox = document.querySelector('.chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
};

onMounted(() => {
    // Example of adding a message on mount
    
    messages.value.push({ user: 'System', text: sacarPromt() });
});
</script>

<style>
.chat-box {
    height: 300px;
    overflow-y: scroll;
    border: 1px solid #ddd;
    padding: 10px;
    background-color: #f8f9fa;
}
.message {
    margin-bottom: 10px;
}
</style>