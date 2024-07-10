# Book Catalog App

This project is a simple book catalog application built using React. It allows users to add books with details such as title, author, genre, and year. Users can also filter books by genre and delete them from the catalog.

![Book Catalog](./public/screnshoot.png)

## Table of Contents

1.  [Installation](#installation)
2.  [Usage](#usage)
3.  [Components](#components)
    - [Layout Component](#layout-component)
    - [Header Component](#header-component)
    - [Footer Component](#footer-component)
    - [App Component](#app-component)
    - [BookForm Component](#bookform-component)
    - [BookList Component](#booklist-component)
    - [BookItem Component](#bookitem-component)
4.  [License](#license)

## Installation

To run this project locally, follow these steps:

1.  Clone the repository:

```bash
git clone <repository-url>
```

2.  Navigate into the project directory:

```bash
cd book-catalog-app
```

3.  Install dependencies:

```bash
npm install`
```

4.  Start the development server:

```bash
npm start
```

## Usage

### Adding a Book

1.  Fill out the book details (Title, Author, Genre, Year) in the form.
2.  Click on the "Add Book" button to add the book to the catalog.

### Filtering Books

- Use the dropdown menu to filter books by genre.

### Deleting a Book

- Click on the trash icon next to the book to delete it from the catalog.

## Components

### Layout Component

The `Layout` component is a wrapper that includes the `Header`, `Footer`, and renders children components.

```jsx
import Header from "./Header";
import Footer from "./Footer";
import style from "./Layout.module.css";

function Layout({ children }) {
  return (
    <div className={style.layout}>
      <Header />
      <main className={style.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
```

### Header Component

The `Header` component renders the top section of the application.

```jsx
import style from "./Header.module.css";

function Header() {
  return (
    <header className={style.header}>
      <img src={bookGif} alt="book-gif" width="30px" />
      <h1>MyBooks</h1>
    </header>
  );
}

export default Header;
```

### Footer Component

The `Footer` component renders the bottom section of the application.

```jsx
import style from "./Footer.module.css";

function Footer() {
  return (
    <footer className={style.footer}>
      <p>&copy; 2024 - Made with love by Jitzu</p>
    </footer>
  );
}

export default Footer;
```

### App Component

The main component that handles state management and renders the entire application.

```jsx
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
    // Additional book objects
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
```

#### State:

- **books**: Array of objects representing books in the catalog.
- **genres**: Array of strings representing available genres.
- **filter**: String representing the currently selected genre for filtering.
- **newGenre**: String representing the newly added genre from user input.

#### Functions:

- **addBook(book)**: Adds a new book to the catalog.
- **deleteBook(id)**: Deletes a book from the catalog based on its ID.
- **handleFilterChange(e)**: Updates the filter state based on user selection.
- **handleNewGenreChange(e)**: Updates the newGenre state based on user input.
- **addGenre()**: Adds a new genre to the genres array.

### BookForm Component

Responsible for rendering the form to add new books.

```jsx
import { useState } from "react";
import style from "./BookForm.module.css";

function BookForm({ addBook, genres }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

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
    <form onSubmit={handleSubmit} className={style.form}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      <label>
        Genre:
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select Genre</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </label>
      <label>
        Year:
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </label>
      <button type="submit" className={style.addButton}>
        Add Book
      </button>
    </form>
  );
}

export default BookForm;
```

#### Props:

- **addBook**: Function to add a new book.
- **genres**: Array of strings representing available genres.

#### State:

- **title, author, genre, year**: Strings representing the input fields in the form.

#### Functions:

- **handleSubmit(e)**: Handles form submission and invokes addBook function.

### BookList Component

Renders the list of books based on the current filter.

```jsx
import BookItem from "./BookItem";
import style from "./BookList.module.css";

function BookList({ books, deleteBook }) {
  return (
    <ul className={style.list}>
      {books.map((book) => (
        <BookItem key={book.id} book={book} deleteBook={deleteBook} />
      ))}
    </ul>
  );
}

export default BookList;
```

#### Props:

- **books**: Array of objects representing books to display.
- **deleteBook**: Function to delete a book.

### BookItem Component

Represents a single book item in the list.

```jsx
import style from "./BookItem.module.css";
import deleteIcon from "../assets/bin.png";

function BookItem({ book, deleteBook }) {
  return (
    <li className={style.item}>
      <div className={style.details}>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>{book.genre}</p>
        <p>{book.year}</p>
      </div>
      <button
        className={style.deleteButton}
        onClick={() => deleteBook(book.id)}
      >
        <img src={deleteIcon} width="18px" alt="Delete" />
      </button>
    </li>
  );
}

export default BookItem;
```

#### Props:

- **book**: Object representing the book details.
- **deleteBook**: Function to delete the book.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
