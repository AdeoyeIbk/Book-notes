import express from "express";
import bodyParser from "body-parser";
import pool from "./config/db.js";

const app = express();
const port = 3000;

pool.connect();

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

app.get("/books", (req, res) => {
  res.render("index");
});

app.get("/new", (req, res) => {
  res.render("new-book");
});

app.post("/addbook", (req, res) => {
  console.log(req.body);
  const title = req.body.title;
  const author = req.body.author;
  const dateRead = req.body.dateRead;
  const rating = req.body.rating;
  const review = req.body.review;
  console.log(title);

  db.query(
    "INSERT INTO book_data (title, author, date_read, rating, review) VALUES($1, $2, $3, $4, $5)",
    [title, author, dateRead, rating, review]
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
