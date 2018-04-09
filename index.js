let voices = []

const msg = new SpeechSynthesisUtterance()
const voicesDropdown = document.querySelector("#voices")
const options = document.querySelectorAll("[name=pitch], [name=rate]")
const speakButton = document.querySelector("#speak")
const stopButton = document.querySelector("#stop")
const textToSpeak = document.querySelector("[name=text]")

speechSynthesis.addEventListener("voiceschanged", populateVoicesDropdown)
voicesDropdown.addEventListener("change", setVoice)
speakButton.addEventListener("click", handleSpeakPress)
stopButton.addEventListener("click", handleStopPress)
options.forEach(option => option.addEventListener("change", setOptionValue))

setVoice()

function populateVoicesDropdown() {
    console.log("AY")
    voices = speechSynthesis.getVoices()

    voicesDropdown.innerHTML = voices.reduce((voiceList, voice) => voiceList.concat(`
        <option value='${ voice.name }'>${ voice.name }</option>
    `), "")
}

function handleSpeakPress() {
    msg.text = textToSpeak.value    
    
    if (!speechSynthesis.speaking) {
        speechSynthesis.speak(msg)
    }
}

function handleStopPress() {
    speechSynthesis.cancel()
}

function setOptionValue() {
    msg[this.name] = this.value
}

function setVoice(e) {
    let voice = voices.find(voice => voice.name === voicesDropdown.value) || voices[0]
    msg.voice = voice
}