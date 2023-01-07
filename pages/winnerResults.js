import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Styles from "../styles/Home.module.css";
// import { Container, Row, Col } from 'react-bootstrap';

function Page() {
  const router = useRouter();
  const [winner,setWinner] = useState([])
  const { id } = router.query;

  useEffect(() => {
    fetch("https://kbcapp-jitendra895.vercel.app/api/getWinner")
      .then((res) => res.json())
      .then((data) => {
       setWinner(data.winner)
        console.log(data.winner);
      });
  }, []);

  return (
    <div className={Styles.winner}>
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>winner</th>
        </tr>
      </thead>
      {winner.slice(0).reverse().map((winner) =>
      <tbody key={winner._id}>
      <tr>
        <td>{winner.date}</td>
        <td>{winner.userName}</td>
      </tr>
    </tbody>
      )}
      
    </table>
    </div>
  );
}

export default Page;