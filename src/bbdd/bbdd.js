// bbdd.js - modo seguro, sin acceso real a Supabase

// Función simulada para guardar un Pokémon
const saveUser = async (pokemon_name, prompt) => {
  // No hacemos nada, solo log para desarrollo
  console.log(`[Simulación] Guardando Pokémon: ${pokemon_name}, prompt: ${prompt}`);
  // Retornamos un objeto simulando éxito
  return { success: true };
};

// Función simulada para obtener un Pokémon
const getUser = async (name) => {
  console.log(`[Simulación] Buscando Pokémon: ${name}`);
  // Retornamos false para indicar que no se encontró (puedes cambiarlo si quieres un prompt de prueba)
  return false;
};

// Exportar funciones que usan la simulación
export const getPokemon = async (name) => {
  return await getUser(name); // siempre devuelve false
};

export const guardarPokemon = async (name, prompt) => {
  return await saveUser(name, prompt); // siempre "éxito" simulado
};
