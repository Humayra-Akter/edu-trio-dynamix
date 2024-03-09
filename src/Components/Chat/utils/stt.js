let subscriptionKey = "eb1707b33b2240eeb8c5ccd0eb2d4f59";
let serviceRegion = "southcentralus"; // e.g., "westus"

const sdk = require("microsoft-cognitiveservices-speech-sdk");

async function textToSpeech(text,speaking,setSpeaking) {
    console.log(text)
    let player = new sdk.SpeakerAudioDestination();
    let speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    speechConfig.speechSynthesisVoiceName = "bn-BD-NabanitaNeural";
    let audioConfig = sdk.AudioConfig.fromSpeakerOutput(player);
    let synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
    setSpeaking(true);
    player.onAudioEnd = () => {
        setSpeaking(false);
    }
    
    synthesizer.speakTextAsync(
        text,
        result => {
            if (result) {
                console.log(`STATUS: ${result.reason}`);
            }
            synthesizer.close();
        },
        error => {
            console.log(`ERROR: ${error}`);
            synthesizer.close();
        }
    )
}

export default textToSpeech;