import DateTimeDisplay from "./DateTimeDisplay";
import useCountDown from "./hook/useCountDown";
import { Image } from "react-bootstrap";

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <a className="countdown-link">
        <DateTimeDisplay isDanger={false} type="Days" value={days} />
        <p>:</p>
        <DateTimeDisplay isDanger={false} type="Hours" value={hours} />
        <p>:</p>
        <DateTimeDisplay isDanger={false} type="Mins" value={minutes} />
        <p>:</p>
        <DateTimeDisplay isDanger={false} type="Seconds" value={seconds} />
      </a>
    </div>
  );
};

const CountDownTimer = ({ targetDate, handleClick }) => {
  const [days, hours, minutes, seconds] = useCountDown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return (
      <>
        <Image src="./logo1.png" alt="kbc" width={280} height={300} />
        <button className="startButton" onClick={handleClick}>
          start
        </button>
      </>
    );
  } else {
    return (
      <>
        <Image src="./logo1.png" alt="kbc" width={280} height={300} />
        <p style={{ color: "white" }}>Quiz will be started in</p>
        <ShowCounter
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      </>
    );
  }
};

export default CountDownTimer;
