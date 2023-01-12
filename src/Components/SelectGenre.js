import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

const SelectGenre = (props) => {
  const [data, setData] = useState([]);
  const [genreID, setGenreId] = useState(0);

  const callGenre = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=a0fdd7d682edade22bbce21b7ecf4554&language=en-US"
      );
      // console.log("API response", response.data);
      setData(response.data.genres);
    } catch (error) {
      console.log("An error has occurred", error);
    }
  };

  useEffect(() => {
    callGenre();
  }, []);

  const callMovieTitles = async (e) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=a0fdd7d682edade22bbce21b7ecf4554&language=en-US&sort_by=popularity.desc,vote_average.desc&with_genres=${genreID}`
      );
      console.log("titles", response.data.results);
      props.setter(response.data.results);
    } catch (error) {
      console.log("An error has occurred", error);
    }
  };

  const titleToGuess =
    props.getter &&
    props.getter[Math.floor(Math.random() * props.getter.length)];

  return (
    <div>
      {/* <FormWrapper>
        <Form action="#">
          <FormGroup>
            <Genre>Select genre:</Genre>
            <InputSelect
              // name="genre"
              onChange={(e) =>
                setGenreId(data.find((d) => e.target.value === d.name).id)
              }
              // required
              // value={genre}
            >
              <option value="">----Select a category----</option>
              {data &&
                data.map((d) => {
                  return (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  );
                })}
            </InputSelect>
          </FormGroup>
        </Form>
      </FormWrapper> */}
      <Genre>Select genre:</Genre>

      <select
        onChange={(e) =>
          setGenreId(data.find((d) => e.target.value === d.name).id)
        }
      >
        {console.log("genre id?", genreID)}
        <option value="">----Select a category----</option>
        {data &&
          data.map((d) => {
            return (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            );
          })}
      </select>

      <button onClick={callMovieTitles}>GO!</button>
      {/* <p>
        <strong>Movie:</strong> {titleToGuess.title}
      </p> */}
    </div>
  );
};

const Genre = styled.div`
  font-family: Chalk;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
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
export default SelectGenre;
