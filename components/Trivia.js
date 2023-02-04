import Styles from "/styles/Home.module.css";
import { useState, useEffect } from "react";
import useSound from "use-sound";

function Trivia({ data, setStop, questionNumber, setQuestionNumber }) {
  const corrects = "/Correct2.mp3";
  const wrongs = "/worng2.mp3";
  const [question, setQuestion] = useState(null);
  const [selectAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [correctAnswer] = useSound(corrects);
  const [wrongAnswer] = useSound(wrongs);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };
  const handleClick = (a, qid) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    setClassName(a.correct ? "answer correct" : "answer wrong");
    delay(1000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };

  if (question?.id <= 15) {
    return (
      <div className={Styles.trivia}>
        <div className={Styles.question}>{question?.question}</div>
        <div className="answers">
          {question?.answers.map((a) => (
            <div
              key={a.id}
              className={selectAnswer === a ? className : "answer"}
              onClick={() => handleClick(a, question?.id)}
            >
              {a.text}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className={Styles.won}>
        <h1>Congratulations! You may win exciting prize &#x1f389;</h1>
        <button onClick={() => setStop(true)}>Ok</button>
      </div>
    );
  }
}

export default Trivia;
