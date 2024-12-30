import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import ChracterList from "./components/ChracterList";
import Navbar, { Favourites, Sarch } from "./components/Navbar";
import Loder from "./components/Loder";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import NotFined from "./components/NotFined";
import { IdentificationIcon, QueueListIcon } from "@heroicons/react/24/solid";
import Modal from "./components/Modal";
import useCharacter from "./Hooks/useCharacter";
import useSrechCharacter from "./Hooks/useSrechCharacter";

function App() {
  const [query, steQueary] = useState("");
  const { characters, isLoder, findNamber } = useCharacter(
    "https://rickandmortyapi.com/api/character",
    query
  );
  const [slectId, steSlectId] = useState(null);
  const [favourite, setFavourite] = useState(
    () => JSON.parse(localStorage.getItem("Favourite")) || []
  );

  // useEffect(() => {
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => res.json())
  //     .then((data) => setCharacters(data.results.slice(0, 5)));
  // }, []);

  // useEffect(() => {
  //   async function fetchDta() {
  //     try {
  //       setIsLoder(true);
  //       const res = await fetch("https://rickandmortyapi.com/api/character");

  //       if (!res.ok) throw new Error("Recovering data encountered an error!");

  //       const data = await res.json();
  //       setCharacters(data.results);
  //       // setIsLoder(false);
  //     } catch (err) {
  //       console.log(err);

  //       toast.error(
  //         err.message,
  //         // err.response.data.message,

  //         {
  //           style: {
  //             padding: "10px",
  //             color: "#f1f5f9",
  //             background: "#334155",
  //           },
  //           iconTheme: {
  //             primary: "#e11d48",
  //             secondary: "#FFFAEE",
  //           },
  //         }
  //       );
  //     } finally {
  //       setIsLoder(false);
  //     }
  //   }
  //   fetchDta();
  // }, [])

  const onSlectItem = (id) => {
    if (id == slectId) steSlectId(null);
    else steSlectId(id);
  };
  useEffect(() => {
    localStorage.setItem("Favourite", JSON.stringify(favourite));
  }, [favourite]);
  const handleAddToFavourite = (cre) => {
    setFavourite([...favourite, cre]);
  };
  const handleDeleteFavourite = (id) => {
    const newFavourite = favourite.filter((fav) => fav.id != id);
    setFavourite(newFavourite);
  };

  const isAddfavourite = favourite.map((fev) => fev.id).includes(slectId);

  return (
    <div className="app">
      <Toaster position="bottom-center" reverseOrder={true} />

      <Navbar>
        <Sarch query={query} steQueary={steQueary} findNamber={findNamber} />
        <Favourites
          Favourite={favourite}
          DeleteFavourite={handleDeleteFavourite}
          onSlectItem={onSlectItem}
          slectId={slectId}
        />
      </Navbar>
      <div className="main">
        <div className="characters-list ">
          <div className="titel-fiex">
            <div className="icon">
              <QueueListIcon />
            </div>

            <h2>Chracter List</h2>
          </div>
          {isLoder ? (
            <Loder />
          ) : !characters.length ? (
            <NotFined
              className={" "}
              text={"No items found..."}
              image={"/img/Mesa de trabajo 1.png"}
            />
          ) : (
            <ChracterList
              characters={characters}
              onSlectItem={onSlectItem}
              slectId={slectId}
              favourite={favourite}
              DeleteFavourite={handleDeleteFavourite}
            />
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div className="titel-fiex">
            <div className="icon">
              <IdentificationIcon />
            </div>
            <h2>Character Detail</h2>
          </div>
          <CharacterDetail
            slectId={slectId}
            AddToFavourite={handleAddToFavourite}
            isAddfavourite={isAddfavourite}
            DeleteFavourite={handleDeleteFavourite}
          />
        </div>
      </div>
    </div>
  );
}
export default App;
