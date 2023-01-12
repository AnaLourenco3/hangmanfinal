import { useCallback, useEffect, useState } from "react";
import { HangmanDrawing } from "../Components/HangmanDrawing";
import { HangmanWord } from "../Components/HangmanWord";
import { Keyboard } from "../Components/Keyboard";

import winnerMe from "../Components/winnersMes.json";
import loser from "../Components/loserArray.json";
import styled from "styled-components";
import BgImg from "../Assets/Chalkboard.png";
import axios from "axios";

const format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

function GamePage() {
  const [wordToGuess, setWordToGuess] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [data, setData] = useState([]);
  const [titles, setTitles] = useState("");

  const callGenre = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=a0fdd7d682edade22bbce21b7ecf4554&language=en-US"
      );
      setData(response.data.genres);
    } catch (error) {
      console.log("An error has occurred", error);
    }
  };
  useEffect(() => {
    callGenre();
  }, []);

  const containSpecialCharacter = (title) => {
    if (format.test(title)) {
      return true;
    } else {
      return false;
    }
  };

  const callMovieTitles = async (e) => {
    const genreID = e.target.value;
    if (genreID !== -1) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=a0fdd7d682edade22bbce21b7ecf4554&language=en-US&sort_by=popularity.desc,vote_average.desc&with_genres=${genreID}`
        );
        console.log("titles", response.data);
        const titles = response.data.results.filter(
          (movieData) => !containSpecialCharacter(movieData.title)
        );
        setTitles(titles);
      } catch (error) {
        console.log("An error has occurred", error);
      }
    }
  };

  const selectNewWord = () => {
    const newTitle = getWord();
    console.log(newTitle, "this is the new title");
    setWordToGuess(newTitle.toLowerCase());
    setGuessedLetters([]);
  };

  function getWord() {
    return titles && titles[Math.floor(Math.random() * titles.length)]?.title;
  }

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  let isLoser = incorrectLetters.length >= 10;
  const isWinner =
    wordToGuess &&
    wordToGuess
      .replace(/ /g, "")
      .split("")
      .every((letter) => guessedLetters.includes(letter));

  console.log("wordToGuess", wordToGuess);
  console.log("guessedLetters", guessedLetters);

  const addGuessedLetter = useCallback(
    (letter) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  return (
    <Background>
      <SelectGenre>
        <p>Select Genre:</p>
        <InputSelect onChange={(e) => callMovieTitles(e)}>
          <option value={-1}>----Select a category----</option>
          {data &&
            data.map((d) => {
              return (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              );
            })}
        </InputSelect>
        {/* <p>
          <strong>Movie:</strong> {wordToGuess}
        </p> */}
      </SelectGenre>
      <Title>HANGMAN - MOVIE EDITION</Title>

      <NewGame onClick={() => selectNewWord()}>NEW GAME</NewGame>
      {/* <Hint onClick={}>Hint</Hint> */}
      <Incorrect>
        Incorrect Letters:{" "}
        <p style={{ textAlign: "center" }}> {incorrectLetters.length} of 10</p>
      </Incorrect>
      <div>
        <HangmanContainer>
          <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        </HangmanContainer>
        <WinLoose>
          {isWinner && (
            <img
              alt=""
              src={winnerMe[Math.floor(Math.random() * winnerMe.length)]}
            ></img>
          )}
          {isLoser && (
            <img
              alt=""
              src={loser[Math.floor(Math.random() * winnerMe.length)]}
            ></img>
          )}
        </WinLoose>
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
      <HangmanWords>
        <HangmanWord
          reveal={isLoser}
          guessedLetters={guessedLetters}
          wordToGuess={wordToGuess}
        />
      </HangmanWords>
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
  position: absolute;
  top: 15%;
  left: 45%;
`;

const HangmanWords = styled.div`
  transform: perspective(600px) translateZ(-200px);
  max-width: 500px;
  display: flex;
  justify-content: center;

  flex-wrap: wrap;
  position: absolute;
  bottom: 25%;
  left: 43%;
`;

const WinLoose = styled.div`
  position: absolute;

  top: 23%;
  right: 25%;

  z-index: 6;
`;

const Title = styled.p`
  color: rgba(250, 250, 250, 0.8);
  position: absolute;
  font-family: Chalk;
  top: 0.1rem;
  left: 39%;
  font-size: 2rem;
  letter-spacing: 5px;
`;

const SelectGenre = styled.div`
  font-family: Chalk;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  position: absolute;
  top: 15%;
  left: 8%;
`;

const NewGame = styled.button`
  position: absolute;
  top: 55%;
  left: 8.5%;
  width: 200px;
  height: 50px;
  background: none;
  border-radius: 50px;
  font-family: Chalk;
  color: rgba(250, 250, 250, 0.8);
  font-size: 1rem;
  letter-spacing: 5px;
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
  top: 35%;
  left: 8%;
`;
