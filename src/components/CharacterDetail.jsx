import { ArrowUpCircleIcon, HeartIcon } from "@heroicons/react/24/solid";

import { useState, useEffect } from "react";
import axios from "axios";
import NotFined from "./NotFined";
import Loder from "./Loder";
import { Toaster, toast } from "react-hot-toast";
// import { character, episodes } from "../../data/data";

function CharacterDetail({
  slectId,
  AddToFavourite,
  isAddfavourite,
  DeleteFavourite,
}) {
  const [character, setCharacter] = useState(null);
  const [detailIsLoder, setDetailIsLoder] = useState(false);
  const [episodeList, setEpisodeList] = useState([]);
  const [episodesIsLoder, setEpisodesIsLoder] = useState(false);
  useEffect(() => {
    async function fetchDta() {
      try {
        setDetailIsLoder(true);

        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${slectId}`
        );
        setCharacter(data);
        setDetailIsLoder(false);
        setEpisodesIsLoder(true);
        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeList } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodeList([episodeList].flat());
        setEpisodesIsLoder(false);
      } catch (err) {
        if (err.message) {
          toast.error(
            err.message,

            // err.response.data.message,

            {
              style: {
                padding: "10px",
                color: "#f1f5f9",
                background: "#334155",
                textAlign: "center",
              },
              iconTheme: {
                primary: "#e11d48",
                secondary: "#FFFAEE",
              },
            }
          );
        }
        toast.error(
          err.response.data.error,

          // err.response.data.message,

          {
            style: {
              padding: "10px",
              color: "#f1f5f9",
              background: "#334155",
              textAlign: "center",
            },
            iconTheme: {
              primary: "#e11d48",
              secondary: "#FFFAEE",
            },
          }
        );
      } finally {
        setDetailIsLoder(false);
        setEpisodesIsLoder(false);
      }
    }
    if (slectId) fetchDta();
    setCharacter(null);
  }, [slectId]);

  if (detailIsLoder) {
    return (
      <div
        className="character-detail"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Loder />
      </div>
    );
  }

  if (!character || !slectId)
    return (
      <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <NotFined
          className={" "}
          text={"Please choose a character."}
          image={"/img/rb_11658.png"}
        />
      </div>
    );

  return (
    <div>
      <Detail
        character={character}
        AddToFavourite={AddToFavourite}
        isAddfavourite={isAddfavourite}
        DeleteFavourite={DeleteFavourite}
      />
      <Episodes episodes={episodeList} episodesIsLoder={episodesIsLoder} />
    </div>
  );
}

export default CharacterDetail;

function Detail({
  character,
  AddToFavourite,
  isAddfavourite,
  DeleteFavourite,
}) {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "👨 " : "👩 "} </span>
          <span>{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""}`}
          ></span>
          <span> {character.status}</span>
          <span> - {character.species}</span>
        </div>
        <div className="location">
          <p>Last known location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isAddfavourite ? (
            <button onClick={() => DeleteFavourite(character.id)}>
              <HeartIcon className="icon red" />
            </button>
          ) : (
            <button onClick={() => AddToFavourite(character)}>
              <HeartIcon className="icon " />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Episodes({ episodes, episodesIsLoder }) {
  const [sortBy, setSortby] = useState(true);
  let sortEpisodes;
  if (sortBy) {
    sortEpisodes = episodes.sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortEpisodes = episodes.sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  if (episodesIsLoder)
    return (
      <div
        className="character-episodes"
        style={{ flex: 1, justifyItems: "center", alignItems: "center" }}
      >
        <Loder />
      </div>
    );

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes:</h2>
        <button onClick={() => setSortby((is) => !is)}>
          <ArrowUpCircleIcon
            className={`icon `}
            style={{ rotate: sortBy ? "0deg" : "180deg" }}
          />
        </button>
      </div>
      <ul>
        {sortEpisodes.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")} - {item.episode} :{" "}
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
