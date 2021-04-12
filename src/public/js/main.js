const socket = io();
const timerElem = document.getElementById("timer");
const state = document.getElementById("title");
const form = document.getElementById('form');
const input = document.getElementById('input');
const video =  document.getElementById('video');


/**
 * Set the title and background color of the actual state of pomodoro 
 * @param {title of the actual pomodoro state} title 
 * @param {color of the actual pomodoro state} color 
 */
const changeBg = (title,color) => {
    state.innerHTML = title;
    document.body.style.backgroundColor = color;
}

/**
 * Format the visual of minutes or seconds (e.g. 9 -> 09)
 * @param {original time in seconds or minutes} time 
 * @returns time formated
 */
const formatTime = (time) => time = time < 10 ? '0'+time : time;

/**
 * print the countdown into the DOM
 * @param {minutes} min 
 * @param {seconds} sec 
 * @returns 
 */
const printCountdown = (min, sec) => timerElem.innerHTML = min + ":" + sec;

/**
 * extract the video id from a YouTube URL (only the part after "v=") to embed in page
 * @param {YouTube url} url 
 * @returns video id
 */
 const extractVideoID = (url) =>{
    const splittedURL = url.split('/')
    if(splittedURL[2]=="youtu.be") return splittedURL[3].replace(/&/g,'?');
    else return splittedURL[3].substring(8).replace(/&/g,'?');
}

socket.on('setup',(time)=>{
    
    const workColor = "#eb534d";
    const breakTimeColor = "#31d686";
    if(!time.mode) changeBg("Work time !",workColor);
    else changeBg("Have a break !",breakTimeColor);
    
    printCountdown(formatTime(time.min),formatTime(time.sec));
    
})

socket.on('timer', (min,sec) => printCountdown(formatTime(min),formatTime(sec)));

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        video.src="https://www.youtube.com/embed/"+extractVideoID(input.value)
        input.value = '';
    }
});