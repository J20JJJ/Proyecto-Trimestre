import { createClient } from '@supabase/supabase-js'; // Asegúrate de importar correctamente

const supabase = createClient(
  'Your SupaBase URL',
  'Your SupaBase Key'
);

// Función para guardar un nuevo usuario
const saveUser = async (pokemon_name, prompt) => {
  try {
    const { data, error } = await supabase
      .from('pokemonprompt')
      .insert([
        { pokemonName: pokemon_name, prompt: prompt }
      ]);

    if (error) {
      console.error('Error al guardar el usuario:', error.message);
    } else {
      console.log('Usuario guardado con éxito:', data);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
};


// Función para obtener un usuario
const getUser = async (name) => {
  try {
    const { data, error } = await supabase
      .from('pokemonprompt')
      .select('prompt')
      .eq('pokemonName', name)
      .maybeSingle(); // .single() para obtener solo un resultado

    if (error) {
      console.error('Error al buscar usuario:', error.message);
      return false; // Si hay error, devuelve false
    } else if (data) {
      // console.log('Usuario encontrado:', data.prompt); // Imprimir el usuario encontrado
      return data.prompt; // Retorna el prompt si se encuentra
    } else {
      console.log('Usuario no encontrado');
      return false; // Si no se encuentra el usuario, devuelve false
    }
  } catch (err) {
    console.error('Error:', err.message);
    return false; // En caso de error en la ejecución, devuelve false
  }
};

// Llamar a la función para buscar al usuario
export const getPokemon = async (name) => {
  return await getUser(name); // Devuelve lo que retorne getUser (prompt o false)
};

export const guardarPokemon = async (name, prompt) =>
  saveUser(name, prompt);

