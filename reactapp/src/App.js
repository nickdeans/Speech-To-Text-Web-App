import React, { useState } from "react";
import { useSpeechToText } from "./useSpeechToText";

const App = () => {
  const [textInput, setTextInput] = useState("");

  const { listening, transcript, startListening, stopListening } =
    useSpeechToText({ continuous: true });

  const startStopListening = () => {
    listening ? stopListening() : startListening();
  };

  const stopVoiceInput = () => {
    setTextInput(
      (prevVal) =>
        prevVal +
        (transcript.length ? (prevVal.length ? " " : "") + transcript : "")
    );
    stopListening();
  };

  return (
    <div style={{ backgroundColor: "blue" }}>
      <h1>Speech-to-Text Example</h1>
      <button onClick={startStopListening} disabled={listening}>
        Start Recording
      </button>
      <button onClick={stopVoiceInput} disabled={!listening}>
        Stop Recording
      </button>
      <p>
        {listening
          ? textInput +
            (transcript.length
              ? (textInput.length ? " " : "") + transcript
              : "")
          : textInput}
      </p>
    </div>
  );
};

export default App;
