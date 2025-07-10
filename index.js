const playlist = [
  { title: "Timeless", artist: "The Weeknd", src: "songs/song1.mp3" },
  { title: "I Don't Want To Miss A Thing", artist: "Aerosmith", src: "songs/song2.mp3" },
  { title: "Dollhouse", artist: "Melanie Martinez", src: "songs/song3.mp3" },
  { title: "Billie Jean", artist: "Micheal Jackson", src: "songs/song4.mp3" },
  { title: "Middle Of The Night", artist: "Elley Duhe", src: "/songs/song5.mp3" },
];

const images = [
  "img/timeless.jpg",
  "img/iDontWantToMissAThing.jpg",
  "img/dollHouse.jpg",
  "img/billieJean.jpg",
  "img/middleOfTheNight.jpg"
]

let currentTrack = 0;
let isPlaying = false;

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const volumeSlider = document.getElementById('volume');

function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  titleEl.textContent = track.title;
  artistEl.textContent = track.artist;
  document.getElementById('replaceImage').src = images[index];
}

function playTrack() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = '⏸️';
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = '▶️';
}

function togglePlay() {
  isPlaying ? pauseTrack() : playTrack();
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  playTrack();
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
  playTrack();
}

function shuffleTrack() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * playlist.length);
  } while (randomIndex === currentTrack);

  currentTrack = randomIndex;
  loadTrack(currentTrack);
  playTrack();
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + '%';

  document.getElementById('current-time').textContent = formatTime(audio.currentTime);
  document.getElementById('duration').textContent = formatTime(audio.duration || 0);
}

function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
shuffleBtn.addEventListener('click', shuffleTrack);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', e => {
  const value = e.target.value;
  audio.volume = value;
  document.getElementById('volume-label').textContent = `Volume: ${Math.round(value * 100)}%`;
});

audio.addEventListener('ended', nextTrack); // autoplay next

// Initialize
loadTrack(currentTrack);
audio.volume = 0.5;
document.getElementById('volume-label').textContent = 'Volume: 50%';
