import style from "./BookItem.module.css";
import deleteIcon from "../assets/bin.png"; // Assicurati di avere questa icona nella cartella corretta

function BookItem({ book, deleteBook }) {
  return (
    <li className={style.item}>
      <div className={style.details}>
        <h3>{book.title}</h3>
        <p>Author: {book.author}</p>
        <p>Genre: {book.genre}</p>
        <p>Year: {book.year}</p>
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
