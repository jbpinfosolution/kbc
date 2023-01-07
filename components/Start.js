import useSound from "use-sound";
import { useRef, useEffect, useState } from "react";
// import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Image } from "react-bootstrap";
import { IonCard, IonCardContent, IonCardHeader, IonRouterLink } from "@ionic/react";
import CountDownTimer from "./CountDownTimer"

function Start({ setUsername, targetDate }) {
  const play = "/startPlay.mp3";
  const [letsPlay] = useSound(play);
  const [name, setName] = useState("");
  const [upi, setUpi] = useState("");
  const [cardOpen, setCardOpen] = useState(false);
  const [singup, setSingup] = useState(false);
  const [logsign, setLogsign] = useState(true);
  const [image, setImage] = useState(true);
  const [hideRegBUtton, setHideRegBUtton] = useState(true);
  const inputRef = useRef();

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "upi") {
      setUpi(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !upi) {
      alert("Please enter username or upi");
      setCardOpen(false);
      return;
    }
    const data = { name, upi };
    let res = await fetch("api/singup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    console.log(response);
    if (response.success) {
      setCardOpen(true);
      setImage(false);
      setHideRegBUtton(false);
      toast.success("Registeration successful!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setCardOpen(true);
      setImage(false);
      setHideRegBUtton(false);
      toast.success(response.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    console.log("start");
    letsPlay();
  }, [letsPlay]);

  const singupClick = () => {
    setSingup(true);
    setLogsign(false);
  };

  function handleClick() {
    setUsername(inputRef.current.value);
  }

  return (
    <div className="start">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />

  
 <IonRouterLink href="/winnerResults"><button className="options-button" >Results</button></IonRouterLink>
   
      {image && <Image src="./kbc.jpg" alt="kbc" width={200} height={250} />}
      {cardOpen && (
        <IonCard className="card">
          <IonCardHeader>Quiz will be started in</IonCardHeader>
          <IonCardContent>
            <CountDownTimer targetDate={targetDate} handleClick={handleClick} />
          </IonCardContent>
        </IonCard>
      )}

      {logsign && (
        <div className="button-container">
          <button onClick={singupClick} className="login-button">
            Register
          </button>
        </div>
      )}

      {singup && (
        <form onSubmit={handleSubmit} method="post">
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Enter Username"
            className="startInput"
            ref={inputRef}
          />
          {hideRegBUtton && (
            <>
              <input
                id="upi"
                type="text"
                name="upi"
                value={upi}
                onChange={handleChange}
                placeholder="Enter your upi id"
                className="startInput"
                autoComplete="off"
              />

              <button className="singupButton" type="submit">
                Register
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
}

export default Start;
