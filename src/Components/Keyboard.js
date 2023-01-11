import styles from "./Keyboard.module.css";
import styled from "styled-components";

const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export function Keyboard({
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
  disabled = false,
}) {
  return (
    <Container
    //   style={{
    //     display: "grid",
    //     gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
    //     gap: ".5rem",
    //   }}
    >
      {KEYS.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
          <button
            onClick={() => addGuessedLetter(key)}
            className={`${styles.btn} ${isActive ? styles.active : ""} ${
              isInactive ? styles.inactive : ""
            }`}
            disabled={isInactive || isActive || disabled}
            key={key}
          >
            {key}
          </button>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 80%;
  left: 34%;
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  grid-gap: 20px;
  max-height: 100vh;
`;
