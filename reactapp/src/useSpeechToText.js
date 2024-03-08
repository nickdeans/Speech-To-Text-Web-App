import React, { useState, useRef, useEffect } from "react";

const options = {
  interimResults: true,
};

export const useSpeechToText = () => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.log("Web Speech API is not supported in this browser.");
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recognitionRef.current;
    // eslint-disable-next-line no-undef
    recognition.interimResults = options.interimResults || true;
    // eslint-disable-next-line no-undef
    recognition.lang = options.lang || "en-US";
    // eslint-disable-next-line no-undef
    recognition.continuous = options.continuous || false;

    if ("webkitSpeechGrammarList" in window) {
      const grammar = "#JSGF V1.0; grammar punctuation";
      const SpeechRecognitionList = new window.webkitSpeechGrammarList();
      SpeechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = SpeechRecognitionList;
    }

    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = (event) => {
      console.log("error1");
    };

    recognition.onend = () => {
      setListening(false);
      setTranscript("");
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !listening) {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && listening) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  return {
    listening,
    transcript,
    startListening,
    stopListening,
  };
};
