This is a fully functional, browser-based piano application built entirely with HTML, CSS, and vanilla JavaScript. It allows users to play musical notes using either a mouse click or a standard keyboard.

The primary technical focus of this project was optimizing audio playback performance and ensuring cross-browser responsiveness.# my-project

✨ **Features**
Keyboard Control: Maps standard QWERTY keys (e.g., 'A', 'S', 'D') to corresponding white and black piano notes.

Audio Caching: Implements an audio preloading and caching strategy in JavaScript to ensure instantaneous, lag-free sound playback even when keys are pressed rapidly.

Volume Control: Includes a functional volume slider that universally controls the volume of all played notes.

Visual Feedback: Keys illuminate briefly when clicked or pressed, enhancing the user experience.

Key Label Toggle: A checkbox allows users to toggle the visibility of the corresponding QWERTY key labels on the piano interface.

Responsive Design: The layout adjusts to maintain playability on different screen sizes (using media queries in CSS).

🛠️ **Technologies Used**
HTML5: Structure, data-key attributes for mapping notes.

CSS3: Styling, Flexbox for layout, CSS Gradients for realistic 3D key appearance.

Vanilla JavaScript: Event handling, Audio Web API, and performance optimization (caching).

WAV Audio Files: Used as note assets.
