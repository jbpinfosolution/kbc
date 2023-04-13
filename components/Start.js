import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Image } from "react-bootstrap";
import CountDownTimer from "./CountDownTimer";
import { useRouter } from "next/router";
import Menu from "./menu";

function Start({ setUsername, adClick, setLoader }) {
  const [name, setName] = useState("");
  const [upi, setUpi] = useState("");
  const [ref, setRef] = useState("");
  const [profile, setProfile] = useState("");
  const [time, setTime] = useState(new Date().getTime());
  const [cardOpen, setCardOpen] = useState(false);
  const [logsign, setLogsign] = useState(false);
  const [image, setImage] = useState(true);
  const [hideRegBUtton, setHideRegBUtton] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();

  function checkAuth() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setImage(false);
      setLogsign(false);
      setCardOpen(true);
      setIsLoggedIn(true);
      setShowProfile(true);
      setRef(userData.name);
      setProfile(userData.upi);
    } else {
      router.push("/");
      setLogsign(true);
    }
  }

  useEffect(() => {
    setLoader(true);
    fetch("https://server-ue6g.vercel.app/api/getCountdownTime")
      .then((res) => res.json())
      .then((tim) => {
        setTime(new Date(tim.time[0].time));
        checkAuth();
        setLoader(false);
      });
  }, []);

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
    let res = await fetch("https://server-ue6g.vercel.app/api/singup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let response = await res.json();
    localStorage.setItem("userData", JSON.stringify(data));
    console.log(response);
    if (response.success) {
      setImage(true);
      setHideRegBUtton(true);
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
      setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    } else {
      setImage(true);
      setHideRegBUtton(true);
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
      setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    }
  };

  const singupClick = () => {
    setLogsign(false);
    setHideRegBUtton(true);
  };

  function handleClick() {
    setUsername(ref);
  }

  return (
    <>
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
        <Menu
          adClick={adClick}
          isLoggedIn={isLoggedIn}
          name={ref}
          upi={profile}
          showProfile={showProfile}
        />
        {image && <Image src="./logo1.png" alt="kbc" width={280} height={300} />}
        {cardOpen && (
          <CountDownTimer targetDate={time} handleClick={handleClick} />
        )}
        {logsign && (
          <div className="button-container">
            <button onClick={singupClick} className="login-button">
              Register
            </button>
          </div>
        )}

        {hideRegBUtton && (
          <>
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
              />
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
            </form>
          </>
        )}
      </div>
    </>
  );
}

export default Start;
