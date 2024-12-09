import {
  EyeIcon,
  MusicalNoteIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Children } from "react";

function ChracterList({
  characters,
  onSlectItem,
  slectId,
  favourite,
  DeleteFavourite,
}) {
  // const favouriteItem = favourite.find((fev) => fev.id == item.id);
  return (
    <div>
      {characters.map((item) => (
        <Character
          key={item.id}
          item={item}
          favourite={favourite}
          DeleteFavourite={DeleteFavourite}
        >
          <button className="icon red" onClick={(e) => onSlectItem(item.id)}>
            {item.id == slectId ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
          {   favourite.find((fev) => fev.id == item.id) ? (
            <button
              className="icon red"
              onClick={() => DeleteFavourite(item.id)}
            >
              <HeartIcon className="icon red" />
            </button>
          ) : (
            ""
          )}
        </Character>
      ))}
    </div>
  );
}

export default ChracterList;

export function Character({ item, favourite, DeleteFavourite, children }) {
  return (
    <div
      className="list__item"
      lassName="list__item"
      // onClick={(e) => onSlectItem(item.id)}
    >
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span>{item.gender === "Male" ? "👨 " : "👩 "} </span>
        <span>{item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span
          className={`status ${item.status === "Dead" ? "red" : ""}`}
        ></span>
        <span> {item.status}</span>
        <span> - {item.species}</span>
      </div>
      <div className="list__item__action">{children}</div>
    </div>
  );
}
