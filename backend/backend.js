const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

//secret key for JWT token generation
const secretKey = "konlak";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Request Denied");

  try {
    const verified = jwt.verify(token, secretKey);

    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invaid Token");
  }
};
const users = [];
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    // This line hashes the given `password` using the bcrypt algorithm.
    // The `await` keyword is used to wait for the asynchronous operation to complete.
    // The second argument, `10`, is the salt rounds, which determines the number of iterations.the hashing algorithm will perform. A higher number of rounds makes the hash more secure but also takes longer to generate.
    users.push({ username, password: hashPassword });
    console.log(users);

    res.status(201).send("User Created successfully");
  } catch (error) {
    res.status(500).send("Error in creating user");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if (!user) return res.status(400).send("User not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    const token = jwt.sign({ username: user.username }, secretKey);
    res.send({ token });
  } catch (error) {
    res.status(500).send("Error in logging in");
  }
});

app.get("/profile", verifyToken, (req, res) => {
  res.send(`Welcome ${req.user.username}`);
});
app.get("/", (req, res) => {
  res.send("hello user");
});

app.listen(3001, () => console.log("Backend running in port 3001"));
