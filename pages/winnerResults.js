import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Styles from "../styles/Home.module.css";
import { App } from "@capacitor/app";

function WinnerResults() {
  const router = useRouter();
  const [winner, setWinner] = useState([]);
  const { id } = router.query;

  useEffect(() => {
    const handleBackButton = async () => {
      if (router.pathname === "/") {
        await App.exitApp();
      } else {
        router.back();
      }
    };
    App.addListener("backButton", handleBackButton);
    return () => {
      App.removeAllListeners("backButton", handleBackButton);
    };
  }, [router.pathname]);

  useEffect(() => {
    fetch("https://server-ue6g.vercel.app/api/getWinner")
      .then((res) => res.json())
      .then((data) => {
        setWinner(data.winner);
      });
  }, []);

  return (
    <div className={Styles.winner}>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Winner</th>
          </tr>
        </thead>
        {winner
          .slice(0)
          .reverse()
          .map((winner) => (
            <tbody key={winner._id}>
              <tr>
                <td>{winner.date}</td>
                <td>{winner.userName}</td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
}

export default WinnerResults;
