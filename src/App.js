import React, { useState, useEffect } from "react";
import "./App.css";
import { useGlitch } from "react-powerglitch";

function App() {
  const glitch = useGlitch({
    playMode: "hover",
  });

  const calculateTimeLeft = () => {
    const year = new Date().getFullYear();
    const difference = +new Date(`09/28/${year}`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: ("0" + Math.floor(difference / (1000 * 60 * 60 * 24))).slice(-2),
        hours: ("0" + Math.floor((difference / (1000 * 60 * 60)) % 24)).slice(
          -2
        ),
        minutes: ("0" + Math.floor((difference / 1000 / 60) % 60)).slice(-2),
        seconds: ("0" + Math.floor((difference / 1000) % 60)).slice(-2),
      };
    } else {
      // Calculate for next year if the date has passed
      const nextYearDifference = +new Date(`09/28/${year + 1}`) - +new Date();
      timeLeft = {
        days: Math.floor(nextYearDifference / (1000 * 60 * 60 * 24)),
        hours: (
          "0" + Math.floor((nextYearDifference / (1000 * 60 * 60)) % 24)
        ).slice(-2),
        minutes: (
          "0" + Math.floor((nextYearDifference / 1000 / 60) % 60)
        ).slice(-2),
        seconds: ("0" + Math.floor((nextYearDifference / 1000) % 60)).slice(-2),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <span ref={glitch.ref}>
            <span style={{ fontFamily: "NuMonoOutline" }}>Re</span>
            <span>dacted Reset</span>
          </span>
        </h1>
        <div>
          {Object.keys(timeLeft).length > 0 ? (
            <h1 style={{ fontFamily: "NuMonoOutline" }}>
              <span ref={glitch.ref}>
                {timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:
                {timeLeft.seconds}
              </span>
            </h1>
          ) : (
            <p>Reset Initiated</p>
          )}
        </div>
      </header>
      <p style={{ display: "none" }}>
        Use the secret code JOHN-LUIGI-BLUIGI on start.gg
      </p>
    </div>
  );
}

export default App;
