const $title = document.querySelector(".title")
const $minuts = document.querySelector(".clock#minuts")
const $seconds = document.querySelector(".clock#seconds")
const $incrementTimer = document.querySelector(".arrow.top")
const $decrementTimer = document.querySelector(".arrow.bottom")
const $start = document.querySelector(".btn#start")
const $reset = document.querySelector(".btn#reset")


var audio =  new Audio("https://www.freespecialeffects.co.uk/soundfx/bells/church_bells_02.wav");




let isStarted = false
$minuts.textContent = (window.localStorage.getItem("minuts") === null || window.localStorage.getItem("minuts") === "" ? 25 : window.localStorage.getItem("minuts"))

$incrementTimer.addEventListener("click", () => {
    let minuts = Number($minuts.textContent)
    $minuts.textContent = minuts > 8 ? minuts + 1 : "0" + (minuts + 1)
    window.localStorage.setItem("minuts", $minuts.textContent)
})

$decrementTimer.addEventListener("click", () => {
    let minuts = Number($minuts.textContent)
    if (minuts > 0) {
        $minuts.textContent = minuts > 10 ? minuts - 1 : "0" + (minuts - 1)
        window.localStorage.setItem("minuts", $minuts.textContent)
    }
})

$start.addEventListener("click", start)
let interval

function start() {
    if (!isStarted) {
        $start.textContent = "PAUSE"
        isFirst = false
        isStarted = true
        $title.textContent = "Job or die!"
        interval = setInterval(timing, 1000)
    } else {
        end()
    }
}

function timing() {
    let seconds = Number($minuts.textContent) * 60 + Number($seconds.textContent)
    if (seconds === 0) {
        $minuts.textContent = (window.localStorage.getItem("minuts") === null || window.localStorage.getItem("minuts") === "" ? 25 : window.localStorage.getItem("minuts"))
        $seconds.textContent = "00"
        end()
        return
    }
    seconds -= 1
    let minut = ((seconds - seconds % 60) / 60)
    $minuts.textContent = minut > 9 ? minut : "0" + minut
    $seconds.textContent = seconds % 60 > 9 ? seconds % 60 : "0" + (seconds % 60)
    ringBell();
}

function end(){
    isStarted = false
    clearInterval(interval)
    const minuts = window.localStorage.getItem("minuts")
    $minuts.textContent = (minuts === null || minuts === "" || minuts === "00" ? 25 : minuts)
    audio.play();
}

function reset() {
    $title.textContent = "Pomodoro Timer"
    $start.textContent = "START"
}

$reset.addEventListener("click", () => {
    reset()
    window.localStorage.setItem("minuts", "25")
    $minuts.textContent = "25"
    $seconds.textContent = "00"
})