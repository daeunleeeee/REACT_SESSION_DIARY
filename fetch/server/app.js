const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let id = 2;
const diaryList = [
  {
    id: 1,
    title: "오늘은 리액트 세션~",
    content: "리액트는 왜 이렇게 재밌을까?",
  },
];

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/api/diary", function (req, res) {
  res.json(diaryList);
});

app.post("/api/diary", (req, res) => {
  const { title, content, mood } = req.body;

  if (diaryList.some((diary) => diary.mood === mood)) {
    return res.status(400).send("Mood already selected for today's entry.");
  }

  diaryList.push({
    id: id++,
    title,
    content,
    mood,
  });
  return res.send("success");
});
// server/app.js

app.delete("/api/diary/:id", (req, res) => {
  const targetId = parseInt(req.params.id);
  const index = diaryList.findIndex((diary) => diary.id === targetId);

  if (index !== -1) {
    diaryList.splice(index, 1);
    return res.send("success");
  } else {
    return res.status(404).send("Not Found");
  }
});
app.listen(4000, () => {
  console.log("server start!");
});
