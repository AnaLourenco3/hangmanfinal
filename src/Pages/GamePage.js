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

  const isLoser = incorrectLetters.length >= 6;
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

  return (
    <Background>
      <Title>HANGMAN - MOVIE EDITION</Title>
      <div>
        <FormWrapper>
          <Form action="#">
            <FormGroup>
              <Genre>Genre:</Genre>
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
      <Button onClick={() => navigate("/")}>NEW GAME</Button>
      <div
        style={
          {
            //   maxWidth: "900px",
            //   display: "flex",
            //   //   flexDirection: "column",
            //   gap: "5rem",
            //   margin: "0 auto",
            //   alignItems: "center",
            //   maxHeight: "400px",
            //   paddingTop: "5rem",
          }
        }
      >
        <WinLoose>
          {isWinner && "Winner! - Refresh to try again"}
          {isLoser && "Nice Try - Refresh to try again"}
        </WinLoose>
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
  position: absolute;
  top: 10%;
  left: 50%;
  height: 200px;
`;

const HangmanWords = styled.div`
  position: absolute;
  top: 59%;
  left: 50%;
`;

const WinLoose = styled.div`
  position: absolute;
  max-width: 200px;
  top: 30%;
  right: 8%;
  font-size: 2rem;
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

const Genre = styled.p`
  font-family: Chalk;
  font-size: 1, 7rem;
  padding-right: 15px;

  left: 5%;
  top: 5%;
`;

const Button = styled.button`
  position: absolute;
  top: 15%;
  left: 5%;
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
  top: 25%;
  left: 5%;
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
