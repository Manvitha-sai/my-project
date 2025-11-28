const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [];
const audioCache = {}; 

// Initialize currentVolume as float [0.0 to 1.0]
let currentVolume = parseFloat(volumeSlider.value); 

// Preload audio for all keys
const preloadAudio = () => {
    pianoKeys.forEach(keyElement => {
        const keyChar = keyElement.dataset.key;
        if (!keyChar) return; 

        allKeys.push(keyChar); 

        const audio = new Audio(`tunes/${keyChar}.wav`);
        audio.volume = Math.min(1, Math.max(0, currentVolume)); 
        audioCache[keyChar] = audio;

        keyElement.addEventListener("click", () => playTune(keyChar));
    });
};

// Play a tune for a given key
const playTune = (key) => {
    const audio = audioCache[key]; 
    if (!audio) return; 

    audio.currentTime = 0; 
    audio.play().catch(error => {
        console.error("Audio playback failed:", error);
    });

    const clickedKey = document.querySelector(`[data-key="${key}"]`); 
    if (clickedKey) {
        clickedKey.classList.add("active");
        setTimeout(() => { 
            clickedKey.classList.remove("active");
        }, 150);
    }
};

// Handle volume changes
const handleVolume = (e) => {
    currentVolume = parseFloat(e.target.value);
    for (let key in audioCache) {
        audioCache[key].volume = Math.min(1, Math.max(0, currentVolume));
    }
};

// Show or hide keys based on checkbox state
const showHideKeys = () => {
    pianoKeys.forEach(key => {
        const noteLabel = key.querySelector("span");
        if (keysCheckbox.checked) {
            noteLabel.classList.remove("hide"); // show note labels
        } else {
            noteLabel.classList.add("hide"); // hide note labels
        }
    });
};

// Handle key press events
const pressedKey = (e) => {
    if(allKeys.includes(e.key)) playTune(e.key);
};

// Execution
preloadAudio(); 

// Event listeners
keysCheckbox.addEventListener("change", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);

// Initialize visibility on page load
showHideKeys();
