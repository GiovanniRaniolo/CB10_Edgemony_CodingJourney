import { useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import Layout from "./components/Layout";
import style from "./App.module.css";

function App() {
  const [books, setBooks] = useState([
    {
      id: crypto.randomUUID(),
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      year: 1960,
    },
    {
      id: crypto.randomUUID(),
      title: "1984",
      author: "George Orwell",
      genre: "Science Fiction",
      year: 1949,
    },
    {
      id: crypto.randomUUID(),
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      year: 1937,
    },
    {
      id: crypto.randomUUID(),
      title: "The Da Vinci Code",
      author: "Dan Brown",
      genre: "Mystery",
      year: 2003,
    },
    {
      id: crypto.randomUUID(),
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      genre: "Non-Fiction",
      year: 2011,
    },
  ]);

  const [genres, setGenres] = useState([
    "Fiction",
    "Non-Fiction",
    "Fantasy",
    "Science Fiction",
    "Mystery",
  ]);

  const [filter, setFilter] = useState("");
  const [newGenre, setNewGenre] = useState("");

  const addBook = (book) => {
    setBooks([...books, { ...book, id: crypto.randomUUID() }]);
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleNewGenreChange = (e) => {
    setNewGenre(e.target.value);
  };

  const addGenre = () => {
    if (newGenre.trim() && !genres.includes(newGenre)) {
      setGenres([...genres, newGenre]);
      setNewGenre("");
    }
  };

  const filteredBooks =
    filter === "" ? books : books.filter((book) => book.genre === filter);

  return (
    <Layout>
      <div className={style.container}>
        <BookForm addBook={addBook} genres={genres} />
        <div className={style.filter}>
          <label htmlFor="genreFilter">Filter by Genre: </label>
          <select id="genreFilter" value={filter} onChange={handleFilterChange}>
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <div className={style.genre}>
            <input
              type="text"
              placeholder="Add a genre"
              value={newGenre}
              onChange={handleNewGenreChange}
            />
            <button className={style.genreButton} onClick={addGenre}>
              Add Genre
            </button>
          </div>
        </div>
        <BookList books={filteredBooks} deleteBook={deleteBook} />
      </div>
    </Layout>
  );
}

export default App;
