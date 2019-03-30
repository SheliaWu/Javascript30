let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const btns = document.querySelectorAll('.timer__button');
function timer(seconds){
	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);
	clearInterval(countdown); 
	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now())/1000);
		if(secondsLeft <= 0){
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secondsLeft);
	},1000)
}

function displayTimeLeft(seconds){
	const minutes = Math.floor(seconds/60);
	const leftSeconds = seconds % 60;
	const display = `${minutes}:${leftSeconds<10?'0':''}${leftSeconds}`;
	document.title = display;
	timerDisplay.textContent = display;
}

function displayEndTime(timestamp){
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	endTime.textContent=`Be Back At ${hour<10?'0':''}${hour}:${minutes<10?'0':''}${minutes}`;
}

function startTimer(){
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

btns.forEach(btn => btn.addEventListener('click',startTimer));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});