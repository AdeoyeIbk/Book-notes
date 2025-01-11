import express from "express";
import bodyParser from "body-parser";
import pool from "./config/db.js";

const app = express();
const port = 3000;
const db = pool;

db.connect();

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

/**TODO
 * ROUTES TO GET THE BOOKS PAGE AND THE NEW BOOK PAGE
 * ADD ROUTES TO HANDLE THE SORTINGS
 * SAVE AND GET THE BOOK NAME, AUTHOR, BOOK COVER, DATE READ, RATING AND REVIEW FROM THE DATABASE
 * DISPLAY THE DATA FROM THE TABLE CORRECTLY ON THE FRONT END
 *
 *
 */

async function getBooks() {
  const result = await db.query("SELECT * FROM book_data ORDER BY rating DESC");
  console.log(result.rows);
  return result.rows[0];
}

app.get("/", async (req, res) => {
  const result = await getBooks();
  res.render("index", {result: result});
});

app.get("/new", (req, res) => {
  res.render("new-book");
});

app.post("/addbook", (req, res) => {
  console.log(req.body);
  const title = req.body.title.toUpperCase();
  const author = req.body.author.toUpperCase();
  const bookCover = req.body.bookCover;
  const dateRead = req.body.dateRead;
  const rating = req.body.rating;
  const review = req.body.review;
  console.log(title);

  db.query(
    "INSERT INTO book_data (title, author, date_read, rating, review, book_cover) VALUES($1, $2, $3, $4, $5, $6)",
    [title, author, dateRead, rating, review, bookCover]
  );
  res.redirect("/new");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
