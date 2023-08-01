const team1Element = document.getElementById('team1');
    const team2Element = document.getElementById('team2');
    const timeElement = document.getElementById('time');
    const faltasElement = document.getElementById('faltas');
    const anotacionesElement = document.getElementById('anotaciones');
    const periodoElement = document.getElementById('periodo');
    const fechaHoraElement = document.getElementById('fecha-hora');
    const darkModeButton = document.querySelector('.dark-mode-toggle button');
    let timerRunning = false;
    let timerInterval;
    const maxTime = 90 * 60;

    // Función para actualizar la fecha y hora actual cada segundo
    function updateDateTime() {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      const formattedDateTime = now.toLocaleString('es-MX', options);
      fechaHoraElement.textContent = formattedDateTime;
    }

    // Función para cambiar entre el modo oscuro y claro
    function toggleDarkMode() {
      const body = document.body;
      body.classList.toggle('dark-mode');
    }

    // Actualizar fecha y hora cada segundo
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Función para iniciar / finalizar el tiempo
    function toggleTimer() {
      if (timerRunning) {
        clearInterval(timerInterval);
      } else {
        let time = 0;
        timerInterval = setInterval(() => {
          time++;
          const minutes = Math.floor(time / 60).toString().padStart(2, '0');
          const seconds = (time % 60).toString().padStart(2, '0');
          timeElement.textContent = `${minutes}:${seconds}`;
          if (time >= maxTime) {
            clearInterval(timerInterval);
            timerRunning = false;
          }
        }, 1000);
      }
      timerRunning = !timerRunning;
    }

    // Función para reiniciar el tiempo
    function resetTimer() {
      clearInterval(timerInterval);
      timeElement.textContent = '00:00';
      timerRunning = false;
    }

    // Funciones para incrementar y decrementar faltas y anotaciones
    function incrementFaltas() {
      faltasElement.textContent = parseInt(faltasElement.textContent) + 1;
    }

    function decrementFaltas() {
      if (parseInt(faltasElement.textContent) > 0) {
        faltasElement.textContent = parseInt(faltasElement.textContent) - 1;
      }
    }

    function incrementAnotaciones() {
      anotacionesElement.textContent = parseInt(anotacionesElement.textContent) + 1;
      showConfetti();
    }

    function decrementAnotaciones() {
      if (parseInt(anotacionesElement.textContent) > 0) {
        anotacionesElement.textContent = parseInt(anotacionesElement.textContent) - 1;
      }
    }

    // Función para mostrar la animación de confeti
    function showConfetti() {
      particlesJS('confetti-container', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: '#6C3483' },
          shape: { type: 'circle', stroke: { width: 0, color: '#000000' }, polygon: { nb_sides: 5 }, image: { src: 'img/github.svg', width: 100, height: 100 } },
          opacity: { value: 0.7, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
          size: { value: 5, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
          line_linked: { enable: false, distance: 500, color: '#ffffff', opacity: 0.4, width: 2 },
          move: { enable: true, speed: 6, direction: 'bottom', random: false, straight: false, out_mode: 'out', bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
        },
        interactivity: {
          detect_on: 'canvas',
          events: { onhover: { enable: false, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
          modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
        },
        retina_detect: true
      });
    }