"use client";
import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {
  const [ledState, setLedState] = useState(0);

  const changeLed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLedState(Number(event.target.value));
    console.log(ledState);
    axios
      .post("http://localhost:5000/led/brightness/" + ledState)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.page}>
      <h1>Light the arduino&apos;s LED</h1>

      <input
        type="range"
        min="1"
        max="100"
        value={ledState}
        className={styles.Slider}
        onChange={changeLed}
      ></input>
    </div>
  );
}
