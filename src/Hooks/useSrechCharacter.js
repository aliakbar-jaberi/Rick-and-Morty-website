import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useSrechCharacter() {
  const [characters, setCharacters] = useState([]);
  const [isLoder, setIsLoder] = useState(false);

  useEffect(
    (url, query) => {
      const controller = new AbortController();
      const signal = controller.signal;
      async function fetchDta() {
        try {
          setIsLoder(true);
          const { data } = await axios.get(
            `https://rickandmortyapi.com/api/character?name=${query}`,
            { signal }
          );

          setCharacters(data.results);

          setFindNamber(data.results.length);
          // setIsLoder(false);
        } catch (err) {
          setCharacters([]);
          setFindNamber(0);
          toast.error(
            "No items found.",
            // err.response.data.message,

            {
              style: {
                padding: "10px",
                color: "#f1f5f9",
                background: "#334155",
              },
              iconTheme: {
                primary: "#e11d48",
                secondary: "#FFFAEE",
              },
            }
          );
        } finally {
          setIsLoder(false);
        }
      }
      fetchDta();
      return () => {
        controller.abort();
      };
    },
    [query]
  );

  return { characters, isLoder };
}
