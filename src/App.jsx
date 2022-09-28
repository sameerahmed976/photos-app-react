import "./style/style.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import Photo from "./Photo";
import { useEffect } from "react";

const mainURL = `https://api.unsplash.com/photos/`;
const searchURL = `https://api.unsplash.com/search/photos/`;

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const dataFetch = await response.json();
      setData(dataFetch);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <section className="form__container">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search by name"
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos__container">
        {data.map((item) => {
          return <Photo key={item.id} {...item} />;
        })}
      </section>
    </main>
  );
}

export default App;
