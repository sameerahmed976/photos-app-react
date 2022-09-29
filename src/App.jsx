import "./style/style.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import Photo from "./Photo";
import { useEffect } from "react";
import { useRef } from "react";

const mainURL = `https://api.unsplash.com/photos/`;
const searchURL = `https://api.unsplash.com/search/photos/`;
const clientId = `?client_id=${import.meta.env.VITE_KEY}`;

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const mounted = useRef(false);
  const [newImages, setNewImages] = useState(false);

  const fetchPhotos = async () => {
    setLoading(true);

    const ulrPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    // console.log(url);

    let url;
    if (query) {
      url = `${searchURL}${clientId}${ulrPage}${urlQuery}`;
    } else {
      url = `${mainURL}${clientId}${ulrPage}`;
    }

    try {
      const response = await fetch(url);
      const dataFetch = await response.json();
      setPhotos((old) => {
        // return [...old, ...dataFetch];

        if (query && page === 1) {
          return data.results;
        } else if (query) {
          // console.log("click");
          console.log([...old, ...dataFetch.results]);
          return [...old, ...dataFetch.results];
        } else {
          return [...old, ...dataFetch];
        }
      });
      setNewImages(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setNewImages(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newImages) {
      return;
    }
    if (loading) {
      return;
    }

    setPage((old) => {
      return old + 1;
    });
  }, [newImages]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      const { scrollY, innerHeight } = window;
      const { scrollHeight } = document.documentElement;
      // console.log(scrollHeight, scrollY, innerHeight);
      if (scrollY + innerHeight >= scrollHeight - 2) {
        setNewImages(true);
      }
    });
    return () => {
      return removeEventListener(scroll, event);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query) {
      return;
    }
    if (page === 1) {
      fetchPhotos();
    }
    setPage(1);
  };

  return (
    <main>
      <section className="form__container">
        <form className="form">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search by name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos__container">
        {photos?.map((item, index) => {
          return <Photo key={index} {...item} />;
        })}

        {loading && <h1 className="loading">Loading</h1>}
      </section>
    </main>
  );
}

export default App;
