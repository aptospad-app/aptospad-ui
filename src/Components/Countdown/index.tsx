import React, {useState, useEffect} from "react";
import moment from "moment";

interface ITF_CountdownProps {
  targetDate: string;
}

const Countdown = ({targetDate = "1993-11-27"}: ITF_CountdownProps) => {
  const targetMs = moment(targetDate).valueOf();
  const nowMs = moment().valueOf();
  const [remaining, setRemaining] = useState<number>(targetMs - nowMs);
  const secondsToDhms = (miliseconds: number): string => {
    const seconds = Number(miliseconds / 1000);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const dDisplay = d + ((d === 0 || d === 1) ? " day" : " days");
    const hDisplay = h.toString().length > 1 ? h : `0${h}`;
    const mDisplay = m.toString().length > 1 ? m : `0${m}`;
    const sDisplay = s.toString().length > 1 ? s : `0${s}`;

    return `${dDisplay}, ${hDisplay}:${mDisplay}:${sDisplay}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const temp = remaining - 1000;
      if (temp >= 0) {
        setRemaining(temp);
      } else {
        setRemaining(0);
      }
    }, 1000);

    if (remaining === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <>
      <span>
        {secondsToDhms(remaining)}
      </span>
    </>
  );
};

export default Countdown;
