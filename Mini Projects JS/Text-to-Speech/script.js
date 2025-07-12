// Check if browser supports Speech Synthesis
if (!('speechSynthesis' in window)) {
    document.getElementById('status').textContent = 'Your browser does not support text-to-speech';
    document.getElementById('speakBtn').disabled = true;
}

// Variables
let voices = [];
let currentUtterance = null;
let isPaused = false;

// Get DOM elements
const textInput = document.getElementById('textInput');
const voiceSelect = document.getElementById('voiceSelect');
const speakBtn = document.getElementById('speakBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const status = document.getElementById('status');

// Load voices function
function loadVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = '<option value="">Default Voice</option>';
    
    // Sorting so we get google voices
    voices.sort((a, b) => {
        // Google voices first
        if (a.name.toLowerCase().includes('google') && !b.name.toLowerCase().includes('google')) {
            return -1;
        }
        if (!a.name.toLowerCase().includes('google') && b.name.toLowerCase().includes('google')) {
            return 1;
        }
        // Then sort alphabetically
        return a.name.localeCompare(b.name);
    });
    
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.value = index;
        
        // Mark Google voices with special indicator
        const isGoogleVoice = voice.name.toLowerCase().includes('google');
        const voiceName = isGoogleVoice ? `🔊 ${voice.name}` : voice.name;
        
        option.textContent = `${voiceName} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

// Load voices when available
loadVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}

// Speak function
function speak() {
    const text = textInput.value.trim();
    
    if (!text) {
        status.textContent = 'Please enter some text to speak';
        return;
    }

    // Stop any ongoing speech
    speechSynthesis.cancel();

    // Create new utterance
    currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Set voice
    if (voiceSelect.value) {
        currentUtterance.voice = voices[voiceSelect.value];
    }
    
    // Set default rate and pitch
    currentUtterance.rate = 1.0;
    currentUtterance.pitch = 1.0;

    // Event listeners
    currentUtterance.onstart = function() {
        status.textContent = 'Speaking...';
        speakBtn.disabled = true;
        pauseBtn.disabled = false;
        stopBtn.disabled = false;
        isPaused = false;
    };

    currentUtterance.onend = function() {
        status.textContent = 'Finished speaking';
        speakBtn.disabled = false;
        pauseBtn.disabled = true;
        stopBtn.disabled = true;
        isPaused = false;
    };

    currentUtterance.onerror = function() {
        status.textContent = 'Error occurred while speaking';
        speakBtn.disabled = false;
        pauseBtn.disabled = true;
        stopBtn.disabled = true;
        isPaused = false;
    };

    // Start speaking
    speechSynthesis.speak(currentUtterance);
}

// Pause/Resume function
function pauseResume() {
    if (isPaused) {
        speechSynthesis.resume();
        pauseBtn.textContent = 'Pause';
        status.textContent = 'Speaking...';
        isPaused = false;
    } else {
        speechSynthesis.pause();
        pauseBtn.textContent = 'Resume';
        status.textContent = 'Paused';
        isPaused = true;
    }
}

// Stop function
function stop() {
    speechSynthesis.cancel();
    status.textContent = 'Stopped';
    speakBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    isPaused = false;
}

// Event listeners
speakBtn.addEventListener('click', speak);
pauseBtn.addEventListener('click', pauseResume);
stopBtn.addEventListener('click', stop);

// Enter key to speak (Ctrl+Enter)
textInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
        speak();
    }
});

// Initialize button states
pauseBtn.disabled = true;
stopBtn.disabled = true;