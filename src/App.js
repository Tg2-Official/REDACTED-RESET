import React, { useState, useEffect } from "react";
import "./App.css";
import { useGlitch } from "react-powerglitch";

function App() {
  const startGGLink = "https://www.start.gg/tournament/redacted-reset/details";
  const tg2YoutubeLink = "https://www.youtube.com/@TG2Official";

  const SECRET_CODE = "JOHN-LUIGI-BLUIGI";
  const SECRET_CODE_MESSAGE = `Use the secret code: ${SECRET_CODE} on start.gg`;

  const eventStartTime = "09/28/2024, 9:30";
  const signupsOpenTime = "08/04/2024, 18:00";
  const startGGLiveTime = "07/28/2024, 9:30";

  // ? These are testing dates
  // const eventStartTime = "07/19/2024, 11:45";
  // const startGGLiveTime = "07/19/2024, 11:47";
  // const signupsOpenTime = "07/19/2024, 11:50";

  const calculateTimeLeft = (inputDate) => {
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
      timeLeft = {
        days: -1,
      };
    }

    return timeLeft;
  };

  const [eventTimeLeft, setEventTimeLeft] = useState(
    calculateTimeLeft(eventStartTime)
  );
  const [signupsTimeLeft, setSignupsTimeLeft] = useState(
    calculateTimeLeft(signupsOpenTime)
  );
  const [startggLiveTimeLeft, startggLiveSetTimeLeft] = useState(
    calculateTimeLeft(startGGLiveTime)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setEventTimeLeft(calculateTimeLeft(eventStartTime));
      setSignupsTimeLeft(calculateTimeLeft(signupsOpenTime));
      startggLiveSetTimeLeft(calculateTimeLeft(startGGLiveTime));
    }, 1000);

    return () => clearTimeout(timer);
  });

  const startGGLogo = () => {
    return (
      <a href={startGGLink} target="_blank" rel="noreferrer">
        <img
          src={process.env.PUBLIC_URL + "/startgg.png"}
          alt="StartGG Logo"
          style={{ width: "20%" }}
        />{" "}
      </a>
    );
  };

  const TitleAndEventCountdown = () => {
    const glitch = useGlitch({
      playMode: "hover",
    });
    return (
      <>
        <h1>
          <span ref={glitch.ref}>
            <span style={{ fontFamily: "NuMonoOutline" }}>Re</span>
            <span>dacted Reset</span>
          </span>
        </h1>
        <div>
          {eventTimeLeft.days !== -1 ? (
            <h1 style={{ fontFamily: "NuMonoOutline" }}>
              <span>
                {eventTimeLeft.days}:{eventTimeLeft.hours}:
                {eventTimeLeft.minutes}:{eventTimeLeft.seconds}
              </span>
            </h1>
          ) : (
            <h2>
              <a href={tg2YoutubeLink} target="_blank" rel="noreferrer">
                Reset Initiated
              </a>
            </h2>
          )}
        </div>
      </>
    );
  };

  const StartGGLiveCountdown = () => {
    return (
      <div>
        <h2>
          <span>
            <span style={{ fontFamily: "NuMonoOutline" }}>St</span>
            <span>art.gg Live</span>
          </span>
        </h2>
        <div>
          {startggLiveTimeLeft.days !== -1 ? (
            <h2 style={{ fontFamily: "NuMonoOutline" }}>
              <span>
                {startggLiveTimeLeft.days}:{startggLiveTimeLeft.hours}:
                {startggLiveTimeLeft.minutes}:{startggLiveTimeLeft.seconds}
              </span>
            </h2>
          ) : (
            startGGLogo()
          )}
        </div>
      </div>
    );
  };

  const SignupsCountdown = () => {
    return (
      <div>
        <h2>
          <span>
            <span style={{ fontFamily: "NuMonoOutline" }}>Si</span>
            <span>gn-ups open</span>
          </span>
        </h2>
        <div>
          {signupsTimeLeft.days !== -1 ? (
            <h2 style={{ fontFamily: "NuMonoOutline" }}>
              <span>
                {signupsTimeLeft.days}:{signupsTimeLeft.hours}:
                {signupsTimeLeft.minutes}:{signupsTimeLeft.seconds}
              </span>
            </h2>
          ) : (
            startGGLogo()
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="App">
      <header className="App-header">
        <TitleAndEventCountdown />

        <StartGGLiveCountdown />

        <SignupsCountdown />
      </header>
      <p style={{ display: "none" }}>{SECRET_CODE_MESSAGE}</p>
    </div>
  );
}

export default App;
