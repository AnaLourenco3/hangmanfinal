import { useCallback, useEffect, useState } from "react";
import { HangmanDrawing } from "../Components/HangmanDrawing";
import { HangmanWord } from "../Components/HangmanWord";
import { Keyboard } from "../Components/Keyboard";
import words from "../Components/wordList";
import styled from "styled-components";
import BgImg from "../Assets/Chalkboard.png";
import { useNavigate } from "react-router-dom";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function GamePage() {
  const navigate = useNavigate();
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [genre, setGenre] = useState("");

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 10;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (e) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  const data = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
  ];

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <Background>
      <Title>HANGMAN - MOVIE EDITION</Title>
      <div>
        <FormWrapper>
          <Form action="#">
            <FormGroup>
              <Genre>Select genre:</Genre>
              <InputSelect
                name="genre"
                onChange={(event) => setGenre(event.target.value)}
                required
                value={genre}
              >
                <option value="">----Select a category----</option>
                {data &&
                  data.map((g, index) => {
                    return (
                      <option key={index} value={g}>
                        {g}
                      </option>
                    );
                  })}
              </InputSelect>
            </FormGroup>
          </Form>
        </FormWrapper>
      </div>
      <NewGame onClick={refreshPage}>NEW GAME</NewGame>
      {/* <Hint onClick={}>Hint</Hint> */}
      <Incorrect>
        Incorrect Letters:{" "}
        <p style={{ textAlign: "center" }}> {incorrectLetters.length} of 10</p>
      </Incorrect>
      <WinLoose>
        {isWinner && "WELL DONE!"}
        {isLoser && "LOOOOOSSSSSEEEERRRRR!"}
      </WinLoose>
      <div
        style={{
          position: "relative",
          left: "5%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",

          margin: "0 auto",
          alignItems: "center",
          maxHeight: "600px",
          paddingTop: "7rem",
        }}
      >
        <HangmanContainer>
          <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        </HangmanContainer>
        <HangmanWords>
          <HangmanWord
            reveal={isLoser}
            guessedLetters={guessedLetters}
            wordToGuess={wordToGuess}
          />
        </HangmanWords>
      </div>
      <div>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </Background>
  );
}

export default GamePage;

const Background = styled.div`
  background: url(${BgImg});
  width: 100%;
  background-size: cover;
  height: 100vh;
  color: #f5f5f5;
  max-height: "100vh";
`;

const HangmanContainer = styled.div`
  transform: perspective(900px) translateZ(-100px);
`;

const HangmanWords = styled.p`
  /* background-color: rgba(0, 0, 0, 0.5); */
  transform: perspective(400px) translateZ(-200px);
`;

const WinLoose = styled.div`
  position: absolute;
  max-width: 200px;
  top: 40%;
  right: 15%;
  font-size: 1.5rem;
  text-align: center;
`;

const Title = styled.p`
  color: rgba(250, 250, 250, 0.8);
  position: absolute;
  font-family: Chalk;
  top: 0.1rem;
  left: 40%;
  font-size: 2rem;
  letter-spacing: 5px;
`;

const Genre = styled.div`
  font-family: Chalk;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

const NewGame = styled.button`
  position: absolute;
  top: 15%;
  left: 8%;
  width: 200px;
  height: 50px;
  background: none;
  border-radius: 50px;
  font-family: Chalk;
  color: rgba(250, 250, 250, 0.8);
  font-size: 1rem;
  letter-spacing: 5px;
`;

const FormWrapper = styled.div`
  position: absolute;
  display: inline;
  top: 30%;
  left: 7%;
`;

const FormGroup = styled.div`
  display: inline;
`;

const Form = styled.form`
  display: inline-block;
  background-color: none;
`;

const InputSelect = styled.select`
  background: none;
  border-radius: 5px;
  padding: 0.5rem;
  font-family: Chalk;
  font-size: 0.8rem;
  color: rgba(250, 250, 250, 0.8);
  border: 1px solid rgba(250, 250, 250, 0.8);
`;

// const Hint = styled.button`
//   position: absolute;
//   top: 60%;
//   left: 8%;
//   width: 200px;
//   height: 50px;
//   background: none;
//   border-radius: 50px;
//   font-family: Chalk;
//   color: rgba(250, 250, 250, 0.8);
//   font-size: 1rem;
//   letter-spacing: 5px;
// `;

const Incorrect = styled.div`
  font-family: Chalk;

  font-size: 1.4rem;
  position: absolute;
  top: 45%;
  left: 7%;
`;
