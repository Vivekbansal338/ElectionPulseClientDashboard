import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import "./CountDownTimer.css";

const CountDownTimer = ({ startDate }) => {
  const totalSeconds = Math.floor((+new Date(startDate) - +new Date()) / 1000);
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  });

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft / 60) % 60);
  const seconds = timeLeft % 60;

  return (
    <Card className="countdown-card">
      <div className="countdown-timer">
        <div className="countdown-item">
          <div className="countdown-circle">
            <span className="countdown-text">{hours}</span>
            <span className="countdown-label">Hours</span>
          </div>
        </div>
        <div className="countdown-item">
          <div className="countdown-circle">
            <span className="countdown-text">{minutes}</span>
            <span className="countdown-label">Minutes</span>
          </div>
        </div>
        <div className="countdown-item">
          <div className="countdown-circle">
            <span className="countdown-text">{seconds}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CountDownTimer;
