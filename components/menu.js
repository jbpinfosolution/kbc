import { IonIcon } from "@ionic/react";
import React, { useState, useRef, useEffect } from "react";
import { menuOutline } from "ionicons/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { Image } from "react-bootstrap";

const Menu = ({ adClick, isLoggedIn,name,upi,showProfile}) => {
  const menuRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  const toggle = () => {
    setOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const logout = () => {
    if (window.confirm("Are you sure to logOut?")) {
      localStorage.removeItem("userData");
      window.location.reload(false);
    }
  };
  return (
    <div>
      <button onClick={toggle} fill="clear" className="options-button">
        <IonIcon
          onClick={toggle}
          size="large"
          icon={menuOutline}
          color="light"
        ></IonIcon>
      </button>
      <nav ref={menuRef} className={`menu ${isOpen ? "open" : ""}`}>
        <div className="toolbar">
          <button onClick={() => setOpen(false)} className="menu-button">
            <IonIcon size="large" icon={menuOutline}></IonIcon>
          </button>
          KBW
        </div>
        {showProfile &&<div className="profile">
          <Image src="./avatar.jpg" alt="kbc" width={100} height={100} />
          <p>{name}</p>
          <p>UPI:- {upi}</p>
        </div>}
        <Link href="/winnerResults" className="link">
          <div onClick={adClick}>Results</div>
        </Link>
        <Link href="/disclaimer" className="link">
          <div onClick={adClick}>Disclaimer</div>
        </Link>
        {isLoggedIn && <div onClick={logout}>LogOut</div>}
      </nav>
    </div>
  );
};

export default Menu;
