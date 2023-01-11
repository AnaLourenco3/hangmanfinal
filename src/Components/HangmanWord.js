export function HangmanWord({ guessedLetters, wordToGuess, reveal = false }) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "3rem",

        textTransform: "uppercase",
        fontFamily: "Chalk",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span style={{ borderBottom: ".1em solid white" }} key={index}>
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && reveal
                  ? "red"
                  : "rgba(250,250,250,0.9)",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
