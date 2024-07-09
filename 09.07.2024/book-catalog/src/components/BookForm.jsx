import { useState } from "react";
import style from "./BookForm.module.css";

function BookForm({ addBook, genres }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Controllo esplicito dei campi obbligatori
    if (!title || !author) {
      alert("Title and Author are required!");
      return;
    }
    addBook({ title, author, genre, year });
    setTitle("");
    setAuthor("");
    setGenre("");
    setYear("");
  };

  return (
    <form onSubmit={handleSubmit} className={style.bookForm}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>
      <div className={style.genreForm}>
        <label htmlFor="genre"></label>
        <select
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        >
          <option value="">Select a genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button className={style.addButton} type="submit">
          Add Book
        </button>
      </div>
    </form>
  );
}

export default BookForm;
