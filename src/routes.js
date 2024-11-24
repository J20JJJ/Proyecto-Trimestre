import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './assets/pg/HomePage.vue';
import pokedex from './components/pokedex.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            children: [
                {
                    path: '',
                    component: HomePage
                },
                {
                    path: 'pokemon/:id',
                    name: 'pokedex',
                    component: pokedex
                },
                {
                    path: 'mis-pokemons',
                    name: 'mis-pokemons',
                    component: () => import("./assets/pg/mis_pokemons.vue")
                },
                {
                    path: 'gacha',
                    name: 'gacha',
                    component: () => import("./assets/pg/gacha.vue")
                }
                
            ]
        }
    ]
});

export default router;
