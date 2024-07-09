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
