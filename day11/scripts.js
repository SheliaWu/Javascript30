const player = document.querySelector(".player");
const video = document.querySelector(".viewer");
const progress = document.querySelector(".progress");
const progressBar = player.querySelector('.progress__filled');
const toggle = document.querySelector(".toggle");
const skipBtns = document.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay(){
	if(video.paused){
		video.play();
		//update icon
  		toggle.textContent = '❚ ❚';
	}else{
		video.pause();
		//update icon
  		toggle.textContent = '►';
	}
}

function skipHandler(){
	video.currentTime += parseFloat(this.dataset.skip);
}

function rangeHandler(){
	video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

toggle.addEventListener('click',togglePlay);
skipBtns.forEach(btn => btn.addEventListener('click', skipHandler));
ranges.forEach(range => range.addEventListener('change',rangeHandler));

video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));