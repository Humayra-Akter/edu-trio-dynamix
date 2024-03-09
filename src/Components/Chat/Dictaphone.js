import Lottie from "lottie-react";
import { Mic, MicOff } from "lucide-react";
import React, { useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import runChat from "./utils/gemini";
import textToSpeech from "./utils/stt";

const Dictaphone = ({
  history,
  setHistory,
  loading,
  setLoading,
  speaking,
  setSpeaking,
}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const timer = useRef(null);

  // useEffect(() => {
  //     textToSpeech('আমি আপনার সাথে কথা বলতে পারি। আপনি আমার সাথে কথা বলতে পারবেন।');
  // }, []);

  const handleStop = async () => {
    SpeechRecognition.stopListening();
    clearTimeout(timer.current);
    if (transcript !== "") {
      setLoading(true);
      await runChat(history, transcript).then((res) => {
        setLoading(false);
        console.log(res);
        textToSpeech(res, speaking, setSpeaking).then(() => {
          setHistory((old) => [
            ...old,
            {
              role: "user",
              parts: [transcript],
            },
            {
              role: "model",
              parts: [res],
            },
          ]);
          resetTranscript();
        });
      });
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="bg-transparent">
      <p className="text-white">{listening ? transcript : ""}</p>
      <p>
        {listening ? (
          <button className=" bg-transparent rounded-full" onClick={handleStop}>
            <p className="w-[15vw]">
              <Lottie animationData={require("./mic_off.json")} loop autoplay />
            </p>
          </button>
        ) : loading || speaking ? (
          <button className=" bg-transparent rounded-full">
            <p className="w-[15vw]">
              <Lottie animationData={require("./loading.json")} loop autoplay />
            </p>
          </button>
        ) : (
          <button
            className="text-6xl bg-[#f16767] p-6 rounded-full"
            onClick={() =>
              SpeechRecognition.startListening({
                continuous: true,
                language: "bn-BD",
              })
            }
          >
            <Mic size={150} />
          </button>
        )}
      </p>
    </div>
  );
};

export default Dictaphone;
