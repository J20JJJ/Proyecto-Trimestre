<style scoped>
  .container11 {
    display: flex;
    justify-content: center;
    height: 100vh;
  }

  .card1 {
    width: 300px;
    height: 220px;
    background-color: rgb(255, 255, 255);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 30px;
    gap: 13px;
    position: relative;
    overflow: hidden;
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.062);
  }

  #cookieSvg {
    width: 50px;
  }

  #cookieSvg g path {
    fill: rgb(97, 81, 81);
  }

  .cookieHeading {
    font-size: 1.2em;
    font-weight: 800;
    color: rgb(26, 26, 26);
  }

  .cookieDescription {
    text-align: center;
    font-size: 0.7em;
    font-weight: 600;
    color: rgb(99, 99, 99);
  }

  .cookieDescription a {
    --tw-text-opacity: 1;
    color: rgb(59 130 246);
  }

  .cookieDescription a:hover {
    -webkit-text-decoration-line: underline;
    text-decoration-line: underline;
  }

  .buttoncontainer11 {
    display: flex;
    gap: 20px;
  }

  .acceptButton {
    width: 80px;
    height: 30px;
    background-color: #7b57ff;
    transition-duration: .2s;
    border: none;
    color: rgb(241, 241, 241);
    cursor: pointer;
    font-weight: 600;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px #977ef3, 0 2px 4px -1px #977ef3;
    transition: all .6s ease;
  }

  .declineButton {
    width: 80px;
    height: 30px;
    background-color: #dadada;
    transition-duration: .2s;
    color: rgb(46, 46, 46);
    border: none;
    font-weight: 600;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px #bebdbd, 0 2px 4px -1px #bebdbd;
    transition: all .6s ease;
  }

  .acceptButton:hover {
    background-color: #9173ff;
    box-shadow: 0 10px 15px -3px #977ef3, 0 4px 6px -2px #977ef3;
    transition-duration: .2s;
  }

  .row11{
    flex-direction: row
  }

  .reverse1{
    flex-direction: row-reverse
  }

  .btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}

.btn:hover {
  background-color: #0056b3;
}

/* Estilo para el modal */
.modal {
  display: flex; /* Usar flex para centrar el modal */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-dialog {
  background-color: white;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  padding: 20px;
}

.modal-header {
  display: flex;
  justify-content: flex-end;
}

.modal-header .btn-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-body {
  background-color: #f65a52;
  padding: 20px;
  color: white;
  text-align: center;
  max-height: 400px; /* Establece la altura máxima */
  overflow-y: auto; /* Activa el scroll si el contenido excede la altura */
}

</style>

<template>
  <div class="container11">
    <div class="card1">
     <svg xml:space="preserve" viewBox="0 0 122.88 122.25" y="0px" x="0px" id="cookieSvg" version="1.1"><g><path d="M101.77,49.38c2.09,3.1,4.37,5.11,6.86,5.78c2.45,0.66,5.32,0.06,8.7-2.01c1.36-0.84,3.14-0.41,3.97,0.95 c0.28,0.46,0.42,0.96,0.43,1.47c0.13,1.4,0.21,2.82,0.24,4.26c0.03,1.46,0.02,2.91-0.05,4.35h0v0c0,0.13-0.01,0.26-0.03,0.38 c-0.91,16.72-8.47,31.51-20,41.93c-11.55,10.44-27.06,16.49-43.82,15.69v0.01h0c-0.13,0-0.26-0.01-0.38-0.03 c-16.72-0.91-31.51-8.47-41.93-20C5.31,90.61-0.73,75.1,0.07,58.34H0.07v0c0-0.13,0.01-0.26,0.03-0.38 C1,41.22,8.81,26.35,20.57,15.87C32.34,5.37,48.09-0.73,64.85,0.07V0.07h0c1.6,0,2.89,1.29,2.89,2.89c0,0.4-0.08,0.78-0.23,1.12 c-1.17,3.81-1.25,7.34-0.27,10.14c0.89,2.54,2.7,4.51,5.41,5.52c1.44,0.54,2.2,2.1,1.74,3.55l0.01,0 c-1.83,5.89-1.87,11.08-0.52,15.26c0.82,2.53,2.14,4.69,3.88,6.4c1.74,1.72,3.9,3,6.39,3.78c4.04,1.26,8.94,1.18,14.31-0.55 C99.73,47.78,101.08,48.3,101.77,49.38L101.77,49.38z M59.28,57.86c2.77,0,5.01,2.24,5.01,5.01c0,2.77-2.24,5.01-5.01,5.01 c-2.77,0-5.01-2.24-5.01-5.01C54.27,60.1,56.52,57.86,59.28,57.86L59.28,57.86z M37.56,78.49c3.37,0,6.11,2.73,6.11,6.11 s-2.73,6.11-6.11,6.11s-6.11-2.73-6.11-6.11S34.18,78.49,37.56,78.49L37.56,78.49z M50.72,31.75c2.65,0,4.79,2.14,4.79,4.79 c0,2.65-2.14,4.79-4.79,4.79c-2.65,0-4.79-2.14-4.79-4.79C45.93,33.89,48.08,31.75,50.72,31.75L50.72,31.75z M119.3,32.4 c1.98,0,3.58,1.6,3.58,3.58c0,1.98-1.6,3.58-3.58,3.58s-3.58-1.6-3.58-3.58C115.71,34.01,117.32,32.4,119.3,32.4L119.3,32.4z M93.62,22.91c2.98,0,5.39,2.41,5.39,5.39c0,2.98-2.41,5.39-5.39,5.39c-2.98,0-5.39-2.41-5.39-5.39 C88.23,25.33,90.64,22.91,93.62,22.91L93.62,22.91z M97.79,0.59c3.19,0,5.78,2.59,5.78,5.78c0,3.19-2.59,5.78-5.78,5.78 c-3.19,0-5.78-2.59-5.78-5.78C92.02,3.17,94.6,0.59,97.79,0.59L97.79,0.59z M76.73,80.63c4.43,0,8.03,3.59,8.03,8.03 c0,4.43-3.59,8.03-8.03,8.03s-8.03-3.59-8.03-8.03C68.7,84.22,72.29,80.63,76.73,80.63L76.73,80.63z M31.91,46.78 c4.8,0,8.69,3.89,8.69,8.69c0,4.8-3.89,8.69-8.69,8.69s-8.69-3.89-8.69-8.69C23.22,50.68,27.11,46.78,31.91,46.78L31.91,46.78z M107.13,60.74c-3.39-0.91-6.35-3.14-8.95-6.48c-5.78,1.52-11.16,1.41-15.76-0.02c-3.37-1.05-6.32-2.81-8.71-5.18 c-2.39-2.37-4.21-5.32-5.32-8.75c-1.51-4.66-1.69-10.2-0.18-16.32c-3.1-1.8-5.25-4.53-6.42-7.88c-1.06-3.05-1.28-6.59-0.61-10.35 C47.27,5.95,34.3,11.36,24.41,20.18C13.74,29.69,6.66,43.15,5.84,58.29l0,0.05v0h0l-0.01,0.13v0C5.07,73.72,10.55,87.82,20.02,98.3 c9.44,10.44,22.84,17.29,38,18.1l0.05,0h0v0l0.13,0.01h0c15.24,0.77,29.35-4.71,39.83-14.19c10.44-9.44,17.29-22.84,18.1-38l0-0.05 v0h0l0.01-0.13v0c0.07-1.34,0.09-2.64,0.06-3.91C112.98,61.34,109.96,61.51,107.13,60.74L107.13,60.74z M116.15,64.04L116.15,64.04 L116.15,64.04L116.15,64.04z M58.21,116.42L58.21,116.42L58.21,116.42L58.21,116.42z"></path></g></svg>
      <p class="cookieHeading">Usamos cookies.</p>
      <p class="cookieDescription">Usamos cookies para asegurarnos de que tengas la mejor experiencia en nuestro sitio web. Estas cookies nos permiten acumular tus Pokémon y el dinero que ganes en la ruleta. <br><a @click="openModal">Lee nuestras políticas de cookies</a>.</p>
  
      <div class="buttoncontainer11" :class="clase">
        <button class="acceptButton" v-on:click="aceptarCookies">Aceptar</button>
        <button class="declineButton" v-on:mouseenter="clase = (clase === 'row1') ? 'reverse1' : 'row1'">Rechazar</button>
      </div>
    </div>
  </div>


  <div>
    <!-- Modal -->
    <div v-if="isModalVisible" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button @click="closeModal" class="btn-close">&times;</button>
          </div>
          <div class="modal-body">
            <div v-html="htmlContent"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Cookies from "js-cookie";
import { ref } from 'vue';
import {marked} from "marked";

const clase = ref('reverse1');

function aceptarCookies(){
  Cookies.set("estado_cookie", 'true', { expires: 36500 });
}

const isModalVisible = ref(false);

// Método para abrir el modal
const openModal = () => {
  isModalVisible.value = true;
};

// Método para cerrar el modal
const closeModal = () => {
  isModalVisible.value = false;
};

const markdownText = `# Política de Cookies

## 1. Introducción
En Puchadex nos tomamos muy en serio la privacidad y seguridad de nuestros usuarios. La presente Política de Cookies tiene como objetivo informarte de manera detallada sobre el uso de las cookies en nuestro sitio web y cómo estas nos permiten ofrecerte una experiencia personalizada mientras juegas en nuestra ruleta para ganar Pokémon y dinero virtual.

Cuando accedes a nuestro sitio web, se utiliza una variedad de cookies que tienen diferentes propósitos, desde mejorar el funcionamiento del sitio, permitirte acumular Pokémon y dinero, hasta garantizar que recibas contenido adecuado a tus intereses.

## 2. ¿Qué son las cookies?
Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, teléfono móvil, tablet, etc.) cuando visitas un sitio web. Las cookies permiten al sitio web recordar tus preferencias y configuraciones para que puedas disfrutar de una experiencia más fluida en tus futuras visitas.

En términos sencillos, las cookies nos permiten recordar la cantidad de Pokémon y dinero que has acumulado en la ruleta, lo que facilita la personalización de tu experiencia en el sitio web.

## 3. Tipos de Cookies que Usamos
En Puchadex, utilizamos diferentes tipos de cookies para garantizar el correcto funcionamiento de nuestra plataforma y ofrecerte la mejor experiencia posible:

### 3.1. Cookies Esenciales
Estas cookies son necesarias para el funcionamiento básico de nuestra página web y para asegurarse de que la ruleta funcione correctamente. Sin estas cookies, no podrías acumular Pokémon ni dinero, ya que nos ayudan a realizar un seguimiento de tu progreso en tiempo real.

**Ejemplo:** Cookies que almacenan tu sesión en la ruleta y las cantidades de Pokémon y dinero acumulados.

### 3.2. Cookies de Rendimiento
Las cookies de rendimiento nos permiten recopilar información sobre cómo los usuarios interactúan con nuestra web. Utilizamos esta información para mejorar la funcionalidad y la navegación del sitio, como asegurarnos de que puedas cargar rápidamente tus datos de Pokémon y dinero.

**Ejemplo:** Cookies que miden la cantidad de tiempo que pasas jugando en la ruleta y cómo interactúas con los elementos del sitio.

### 3.3. Cookies de Funcionalidad
Las cookies de funcionalidad permiten que nuestra web recuerde tus preferencias y configuraciones para que puedas disfrutar de una experiencia personalizada en cada sesión. Por ejemplo, las cookies que recuerdan la cantidad de Pokémon que has acumulado para mostrarte tu progreso.

**Ejemplo:** Cookies que retienen tu configuración de idioma y las preferencias de visualización.

### 3.4. Cookies de Publicidad y Marketing
Estas cookies se utilizan para personalizar los anuncios que ves mientras navegas por la web. Nos permiten mostrarte anuncios relacionados con los juegos, promociones o eventos especiales que podrían interesarte, basándonos en la información sobre tu actividad en el sitio, como la cantidad de Pokémon que has ganado.

**Ejemplo:** Cookies que registran tus intereses basados en las actividades en la ruleta y te muestran promociones sobre nuevos juegos o características.

### 3.5. Cookies de Terceros
En ocasiones, podemos permitir que otros proveedores de servicios, como plataformas de análisis o redes sociales, instalen cookies en tu dispositivo para ayudarnos a mejorar la experiencia del usuario y recopilar estadísticas sobre el uso del sitio.

**Ejemplo:** Cookies de Google Analytics para medir el tráfico y la interacción con las diferentes secciones de la web, incluyendo la ruleta.

## 4. ¿Cómo Usamos las Cookies?
En Puchadex, usamos las cookies para:

- Acumular tus Pokémon y dinero: Las cookies permiten que se registren y actualicen automáticamente la cantidad de Pokémon que has ganado en la ruleta y el dinero virtual que has acumulado a lo largo del tiempo.
- Personalizar tu experiencia: Al almacenar tus preferencias y progreso, podemos ofrecerte una experiencia única cada vez que ingresas a nuestra web.
- Optimizar el rendimiento del sitio: Las cookies de rendimiento nos permiten mejorar la velocidad, estabilidad y funcionalidad general de nuestro sitio, para que puedas disfrutar de una navegación sin interrupciones.
- Mostrar contenido relevante: Usamos cookies de marketing para ofrecerte anuncios y promociones de juegos o características que pueden ser de tu interés, basados en tus actividades dentro del sitio.

## 5. ¿Cómo Puedes Controlar las Cookies?
Puedes controlar y gestionar las cookies a través de la configuración de tu navegador. Si no deseas que utilicemos cookies, puedes configurar tu navegador para rechazar todas las cookies o alertarte cuando se envíen cookies a tu dispositivo. Ten en cuenta que si desactivas las cookies, algunas funcionalidades de nuestro sitio web, como el seguimiento de tus Pokémon y dinero, podrían no funcionar correctamente.

### Pasos para gestionar las cookies:
- **Google Chrome:** Abre el menú de configuración, selecciona "Privacidad y seguridad", luego "Cookies y otros datos de sitios". Desde allí podrás ajustar tus preferencias de cookies.
- **Mozilla Firefox:** Abre el menú de opciones, selecciona "Privacidad y seguridad", y en la sección de cookies y datos del sitio, podrás gestionarlas.
- **Safari:** En las preferencias de Safari, selecciona "Privacidad" y allí podrás gestionar las cookies.

Para obtener información más detallada sobre cómo gestionar las cookies en otros navegadores, te recomendamos que consultes la sección de ayuda de tu navegador.

## 6. ¿Cómo Afectan las Cookies a la Acumulación de Pokémon y Dinero?
Al aceptar las cookies, se habilita el seguimiento automático de tus avances en la ruleta, incluyendo el número de Pokémon que has ganado y el dinero que has acumulado. Si eliges no aceptar las cookies, el sistema no podrá registrar ni almacenar esta información, lo que limitaría tu capacidad para disfrutar de la acumulación de Pokémon y dinero de forma continua en futuras visitas.

## 7. ¿Durante Cuánto Tiempo se Almacenan las Cookies?
La duración de almacenamiento de las cookies varía dependiendo del tipo de cookie:

- **Cookies de sesión:** Estas cookies se eliminan automáticamente cuando cierras tu navegador.
- **Cookies persistentes:** Estas cookies permanecen en tu dispositivo durante un período de tiempo específico o hasta que las elimines manualmente. Estas cookies se utilizan, por ejemplo, para recordar tu progreso en la ruleta y la cantidad de Pokémon ganados entre sesiones.

## 8. Cambios en la Política de Cookies
Podemos actualizar esta política de cookies en cualquier momento para reflejar cambios en nuestra práctica o en la legislación aplicable. Cualquier cambio será publicado en esta página, por lo que te recomendamos que revises periódicamente nuestras políticas.

## 9. Contacto
Si tienes preguntas o inquietudes acerca de nuestra Política de Cookies, no dudes en ponerte en contacto con nosotros. Puedes hacerlo enviando un correo electrónico a francisco.javier.millan.mateos@alumnojoyfe.iepgroup.es.
`
const htmlContent = ref(marked(markdownText))
</script>
