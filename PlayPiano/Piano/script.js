// const pianoKeys = document.querySelectorAll(".piano-keys .key"),
//     volumeSlider = document.querySelector(".volume-slider input"),
//     keysCheckbox = document.querySelector(".keys-checkbox input");

// let allKeys = [];
// const audioCache = {}; 

// // FIX 1: Initialize currentVolume by parsing the slider value to guarantee it's a float [0.0 to 1.0]
// let currentVolume = parseFloat(volumeSlider.value); 


// const preloadAudio = () => {
//     pianoKeys.forEach(keyElement => {
//         // FIX 2: Correctly retrieve the key character from the HTML element's dataset.
//         const keyChar = keyElement.dataset.key;

//         // Ensure keyChar is valid before attempting to load audio
//         if (!keyChar) return; 

//         allKeys.push(keyChar); 

//         // Create the Audio object once and store it in the cache
//         const audio = new Audio(`tunes/${keyChar}.wav`);

//         // FIX 1: Clamp the volume to be absolutely sure it's between 0 and 1
//         audio.volume = Math.min(1, Math.max(0, currentVolume)); 
//         audioCache[keyChar] = audio;

//         // FIX 3: Attach the click listener, correctly passing the reliable keyChar
//         keyElement.addEventListener("click", () => playTune(keyChar));
//     });
// };


// const playTune = (key) => {
//     const audio = audioCache[key]; 
//     if (!audio) return; 

//     // Reset audio to the beginning for quick, non-overlapping playback
//     audio.currentTime = 0; 
    
//     audio.play().catch(error => {
//         console.error("Audio playback failed:", error);
//     });

//     const clickedKey = document.querySelector(`[data-key="${key}"]`); 
//     // Check for null before calling classList (safety check)
//     if (clickedKey) {
//         clickedKey.classList.add("active");
//         setTimeout(() => { 
//             clickedKey.classList.remove("active");
//         }, 150);
//     }
// }


// const handleVolume = (e) => {
//     // FIX 1: Parse value as a float and clamp it to the [0, 1] range
//     currentVolume = parseFloat(e.target.value);
    
//     // Apply the new volume to ALL pre-loaded audio objects in the cache
//     for (let key in audioCache) {
//         // Re-clamping for safety, though it should be unnecessary if the slider max is 1
//         audioCache[key].volume = Math.min(1, Math.max(0, currentVolume));
//     }
// }


// const showHideKeys = () => {
//     pianoKeys.forEach(key => key.classList.toggle("hide"));
// }

// const pressedKey = (e) => {
//     if(allKeys.includes(e.key)) playTune(e.key);
// }

// // Execution
// preloadAudio(); 

// keysCheckbox.addEventListener("click", showHideKeys);
// volumeSlider.addEventListener("input", handleVolume);
// document.addEventListener("keydown", pressedKey);

// Select DOM elements
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












// Select containers
// const pianoKeysContainer = document.querySelector(".piano-keys");
// const volumeSlider = document.getElementById("volume-input");
// const keysToggle = document.getElementById("keys-toggle");

// let currentVolume = parseFloat(volumeSlider.value);
// const audioCache = {};
// let allNotes = [];

// // Define all 88 piano notes (A0 to C8)
// const notes = [
//   "A0","A#0","B0",
//   "C1","C#1","D1","D#1","E1","F1","F#1","G1","G#1","A1","A#1","B1",
//   "C2","C#2","D2","D#2","E2","F2","F#2","G2","G#2","A2","A#2","B2",
//   "C3","C#3","D3","D#3","E3","F3","F#3","G3","G#3","A3","A#3","B3",
//   "C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4",
//   "C5","C#5","D5","D#5","E5","F5","F#5","G5","G#5","A5","A#5","B5",
//   "C6","C#6","D6","D#6","E6","F6","F#6","G6","G#6","A6","A#6","B6",
//   "C7","C#7","D7","D#7","E7","F7","F#7","G7","G#7","A7","A#7","B7",
//   "C8"
// ];

// // Generate keys dynamically
// notes.forEach(note => {
//   const li = document.createElement("li");
//   li.classList.add("key");

//   if (note.includes("#")) {
//     li.classList.add("black");
//   } else {
//     li.classList.add("white");
//   }

//   li.dataset.note = note;
//   li.innerHTML = `<span>${note}</span>`;
//   pianoKeysContainer.appendChild(li);
// });

// // Preload audio
// const preloadAudio = () => {
//   const pianoKeys = document.querySelectorAll(".piano-keys .key");
//   pianoKeys.forEach(keyElement => {
//     const note = keyElement.dataset.note;
//     allNotes.push(note);

//     const audio = new Audio(`tunes/${note}.mp3`); // ensure files exist
//     audio.volume = currentVolume;
//     audioCache[note] = audio;

//     keyElement.addEventListener("click", () => playTune(note));
//   });
// };

// // Play sound
// const playTune = (note) => {
//   const audio = audioCache[note];
//   if (!audio) return;

//   audio.currentTime = 0;
//   audio.play().catch(err => console.error("Playback failed:", err));

//   const clickedKey = document.querySelector(`[data-note="${note}"]`);
//   if (clickedKey) {
//     clickedKey.classList.add("active");
//     setTimeout(() => clickedKey.classList.remove("active"), 150);
//   }
// };

// // Volume control
// const handleVolume = (e) => {
//   currentVolume = parseFloat(e.target.value);
//   for (let note in audioCache) {
//     audioCache[note].volume = currentVolume;
//   }
// };

// // Toggle labels
// const showHideKeys = () => {
//   const pianoKeys = document.querySelectorAll(".piano-keys .key span");
//   pianoKeys.forEach(span => {
//     span.style.display = keysToggle.checked ? "block" : "none";
//   });
// };

// // Keyboard mapping (example: only one octave mapped)
// const keyMap = {
//   a: "C4", w: "C#4", s: "D4", e: "D#4", d: "E4",
//   f: "F4", t: "F#4", g: "G4", y: "G#4", h: "A4",
//   u: "A#4", j: "B4", k: "C5"
// };

// const pressedKey = (e) => {
//   const note = keyMap[e.key];
//   if (note && allNotes.includes(note)) playTune(note);
// };

// // Execution
// preloadAudio();
// volumeSlider.addEventListener("input", handleVolume);
// keysToggle.addEventListener("change", showHideKeys);
// document.addEventListener("keydown", pressedKey);
