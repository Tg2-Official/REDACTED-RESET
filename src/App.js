import React, { useState, useEffect } from "react";
import "./App.css";
import { useGlitch } from "react-powerglitch";

function App() {
  const glitch = useGlitch({
    playMode: "hover", 
  });

  

  const calculateTimeLeft = (inputDate) => {
    const year = new Date().getFullYear();
    const difference = +new Date(inputDate) - +new Date();
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
        days: -1
      };
    }

    return timeLeft;
  };

  var time1 = '09/28/2024, 9:30'
  var time2 = '08/04/2024, 18:00'
  var time3 = '07/28/2024, 9:30'

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(time1));
  const [startggTimeLeft, startggSetTimeLeft] = useState(calculateTimeLeft(time2));
  const [startggLiveTimeLeft, startggLiveSetTimeLeft] = useState(calculateTimeLeft(time3));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(time1));
      startggSetTimeLeft(calculateTimeLeft(time2));
      startggLiveSetTimeLeft(calculateTimeLeft(time3));
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1 ref={glitch.ref}>
          <span ref={glitch.ref}>
            <span style={{ fontFamily: "NuMonoOutline" }}>Re</span>
            <span>dacted Reset</span>
          </span>
        </h1>
        <div>
          {timeLeft.days > 0 ? (
            <h1 style={{ fontFamily: "NuMonoOutline" }}>
              <span ref={glitch.ref}>
                {timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:
                {timeLeft.seconds}
              </span>
            </h1>
          ) : (
            <h2><a ref={glitch.ref} href='https://www.youtube.com/@TG2Official' target="_blank">Reset Initiated</a></h2>
          )}
        </div>
        
        {startggTimeLeft.days > 0 ? (
        <div>
        <h2>
          <span ref={glitch.ref}>
            <span style={{ fontFamily: "NuMonoOutline" }}>St</span>
            <span>art.gg Live</span>
          </span>
        </h2>
        <div>
          {startggLiveTimeLeft.days > 0 ? (
            <h2 style={{ fontFamily: "NuMonoOutline" }}>
              <span ref={glitch.ref}>
                {startggLiveTimeLeft.days}:{startggLiveTimeLeft.hours}:{startggLiveTimeLeft.minutes}:
                {startggLiveTimeLeft.seconds}
              </span>
            </h2>
          ) : (
            <a ref={glitch.ref} href="https://www.start.gg/tournament/redacted-reset/details" target="_blank"><img src={process.env.PUBLIC_URL + "/logo.png"} /> </a>
          )}
        </div>
        </div>
        ) : (
          <p></p>
        )}
        
        {timeLeft.days > 0 ? (
        <p>
        <h2>
          <span ref={glitch.ref}>
            <span style={{ fontFamily: "NuMonoOutline" }}>Si</span>
            <span>gn-ups open</span>
          </span>
        </h2>
        <div>
          {startggTimeLeft.days > 0 ? (
            <h2 style={{ fontFamily: "NuMonoOutline" }}>
              <span ref={glitch.ref}>
                {startggTimeLeft.days}:{startggTimeLeft.hours}:{startggTimeLeft.minutes}:
                {startggTimeLeft.seconds}
              </span>
            </h2>
          ) : (
            <a ref={glitch.ref} href="https://www.start.gg/tournament/redacted-reset/details" target="_blank"><img src={process.env.PUBLIC_URL + "/logo.png"} /> </a>
          )}
        </div>
        </p>
        ) : (
          <p></p>
        )}

        
      </header>
      <p style={{ display: "none" }}>
        Use the secret code JOHN-LUIGI-BLUIGI on start.gg
      </p>
    </div>
  );
}

export default App;
