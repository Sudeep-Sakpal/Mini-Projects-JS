class MusicPlayer {
  constructor() {
    this.tracks = [
      { title: "Summer Vibes", artist: "Chill Beats", duration: 222 },
      { title: "Midnight Dreams", artist: "Ambient Sounds", duration: 255 },
      { title: "Ocean Waves", artist: "Nature Sounds", duration: 208 },
      { title: "City Lights", artist: "Urban Vibes", duration: 241 },
    ];

    this.currentTrack = 0;
    this.isPlaying = false;
    this.currentTime = 0;
    this.volume = 0.7;
    this.isShuffleOn = false;
    this.repeatMode = 0; // 0: no repeat, 1: repeat all, 2: repeat one

    this.initElements();
    this.bindEvents();
    this.updateDisplay();
    this.startProgressSimulation();
  }

  initElements() {
    this.playBtn = document.getElementById("playBtn");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.progressBar = document.getElementById("progressBar");
    this.progress = document.getElementById("progress");
    this.currentTimeEl = document.getElementById("currentTime");
    this.totalTimeEl = document.getElementById("totalTime");
    this.trackTitle = document.getElementById("trackTitle");
    this.trackArtist = document.getElementById("trackArtist");
    this.volumeSlider = document.getElementById("volumeSlider");
    this.shuffleBtn = document.getElementById("shuffleBtn");
    this.repeatBtn = document.getElementById("repeatBtn");
    this.visualizer = document.getElementById("visualizer");
    this.playlistItems = document.querySelectorAll(".playlist-item");
  }

  bindEvents() {
    this.playBtn.addEventListener("click", () => this.togglePlay());
    this.prevBtn.addEventListener("click", () => this.previousTrack());
    this.nextBtn.addEventListener("click", () => this.nextTrack());
    this.progressBar.addEventListener("click", (e) => this.seekTo(e));
    this.volumeSlider.addEventListener("input", (e) =>
      this.setVolume(e.target.value)
    );
    this.shuffleBtn.addEventListener("click", () => this.toggleShuffle());
    this.repeatBtn.addEventListener("click", () => this.toggleRepeat());

    this.playlistItems.forEach((item, index) => {
      item.addEventListener("click", () => this.selectTrack(index));
    });
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    this.playBtn.textContent = this.isPlaying ? "⏸" : "▶";
    this.updateVisualizer();
  }

  previousTrack() {
    this.currentTrack =
      this.currentTrack === 0 ? this.tracks.length - 1 : this.currentTrack - 1;
    this.currentTime = 0;
    this.updateDisplay();
    this.updatePlaylist();
  }

  nextTrack() {
    if (this.isShuffleOn) {
      this.currentTrack = Math.floor(Math.random() * this.tracks.length);
    } else {
      this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
    }
    this.currentTime = 0;
    this.updateDisplay();
    this.updatePlaylist();
  }

  selectTrack(index) {
    this.currentTrack = index;
    this.currentTime = 0;
    this.updateDisplay();
    this.updatePlaylist();
  }

  seekTo(e) {
    const rect = this.progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    this.currentTime = percentage * this.tracks[this.currentTrack].duration;
    this.updateProgress();
  }

  setVolume(value) {
    this.volume = value / 100;
    document.querySelector(".volume-icon").textContent =
      value == 0 ? "🔇" : value < 50 ? "🔉" : "🔊";
  }

  toggleShuffle() {
    this.isShuffleOn = !this.isShuffleOn;
    this.shuffleBtn.classList.toggle("active", this.isShuffleOn);
  }

  toggleRepeat() {
    this.repeatMode = (this.repeatMode + 1) % 3;
    this.repeatBtn.textContent =
      this.repeatMode === 0 ? "🔁" : this.repeatMode === 1 ? "🔂" : "🔂";
    this.repeatBtn.classList.toggle("active", this.repeatMode > 0);
  }

  updateDisplay() {
    const track = this.tracks[this.currentTrack];
    this.trackTitle.textContent = track.title;
    this.trackArtist.textContent = track.artist;
    this.totalTimeEl.textContent = this.formatTime(track.duration);
    this.updateProgress();
  }

  updateProgress() {
    const track = this.tracks[this.currentTrack];
    const percentage = (this.currentTime / track.duration) * 100;
    this.progress.style.width = percentage + "%";
    this.currentTimeEl.textContent = this.formatTime(this.currentTime);
  }

  updatePlaylist() {
    this.playlistItems.forEach((item, index) => {
      item.classList.toggle("active", index === this.currentTrack);
    });
  }

  updateVisualizer() {
    const bars = this.visualizer.querySelectorAll(".bar");
    bars.forEach((bar) => {
      bar.style.animationPlayState = this.isPlaying ? "running" : "paused";
    });
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  startProgressSimulation() {
    setInterval(() => {
      if (this.isPlaying) {
        this.currentTime += 0.1;
        const track = this.tracks[this.currentTrack];

        if (this.currentTime >= track.duration) {
          if (this.repeatMode === 2) {
            this.currentTime = 0;
          } else if (
            this.repeatMode === 1 ||
            this.currentTrack < this.tracks.length - 1
          ) {
            this.nextTrack();
          } else {
            this.isPlaying = false;
            this.playBtn.textContent = "▶";
            this.updateVisualizer();
          }
        }

        this.updateProgress();
      }
    }, 100);
  }
}

// Initialize the music player
const player = new MusicPlayer();
