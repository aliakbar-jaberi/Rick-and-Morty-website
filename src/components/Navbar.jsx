import { EyeIcon, EyeSlashIcon, HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./ChracterList";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="navbar__logo">
      <img src="/img/b6740400-92d4-11ea-8a13-d5f6e0558e9b.png" alt="" />
    </div>
  );
}

export function Sarch({ query, steQueary, findNamber }) {
  return (
    <div className="navbar__sarch">
      <input
        value={query}
        onChange={(e) => steQueary(e.target.value)}
        className="text-field"
        type="text"
        placeholder="sarch..."
      />
      {findNamber && query ? (
        <div className="navbar__result">{findNamber} results found</div>
      ) : (
        ""
      )}
    </div>
  );
}

export function Favourites({ Favourite, DeleteFavourite, slectId, onSlectItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal titel={"Favourites List"} open={isOpen} onOpen={setIsOpen}>
        {Favourite.map((item) => (
          <Character
            key={item.id}
            item={item}
            favourite={Favourite}
            DeleteFavourite={DeleteFavourite}
          >
            <button className="icon red" onClick={(e) => onSlectItem(item.id)}>
              {item.id == slectId ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
            {Favourite.find((fev) => fev.id == item.id) ? (
              <button
                className="icon red"
                onClick={() => DeleteFavourite(item.id)}
              >
                <TrashIcon className="icon red" />
              </button>
            ) : (
              ""
            )}
          </Character>
        ))}
      </Modal>

      <button className="heart" onClick={() => setIsOpen(true)}>
        <HeartIcon className={Favourite.length ? "icon red" : "icon"} />
        {Favourite.length ? (
          <span className="badge">{Favourite.length}</span>
        ) : (
          ""
        )}
      </button>
    </>
  );
}

export default Navbar;
