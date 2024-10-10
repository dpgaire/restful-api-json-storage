// routes/snippets.js
const express = require("express");
const { readData, writeData } = require("../utils/fileUtils");
const router = express.Router();

// GET all snippets
router.get("/", async (req, res) => {
  const snippets = await readData();
  res.json(snippets);
});

// GET a single snippet by ID
router.get("/:id", async (req, res) => {
  const snippets = await readData();
  const snippet = snippets.find((s) => s.id === req.params.id);
  if (!snippet) {
    return res.status(404).json({ message: "Snippet not found" });
  }
  res.json(snippet);
});

// POST (Create) a new snippet
router.post("/", async (req, res) => {
  const { title, description, codeSnippet } = req.body;

  if (!title || !description || !codeSnippet) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const snippets = await readData();
  const newSnippet = {
    id: Date.now().toString(), // Simple unique ID
    title,
    description,
    codeSnippet,
  };
  snippets.push(newSnippet);

  await writeData(snippets);
  res.status(201).json(newSnippet);
});

// PUT (Update) an existing snippet by ID
router.put("/:id", async (req, res) => {
  const { title, description, codeSnippet } = req.body;

  const snippets = await readData();
  const snippetIndex = snippets.findIndex((s) => s.id === req.params.id);

  if (snippetIndex === -1) {
    return res.status(404).json({ message: "Snippet not found" });
  }

  const updatedSnippet = {
    ...snippets[snippetIndex],
    title: title || snippets[snippetIndex].title,
    description: description || snippets[snippetIndex].description,
    codeSnippet: codeSnippet || snippets[snippetIndex].codeSnippet,
  };

  snippets[snippetIndex] = updatedSnippet;
  await writeData(snippets);

  res.json(updatedSnippet);
});

// DELETE a snippet by ID
router.delete("/:id", async (req, res) => {
  const snippets = await readData();
  const filteredSnippets = snippets.filter((s) => s.id !== req.params.id);

  if (filteredSnippets.length === snippets.length) {
    return res.status(404).json({ message: "Snippet not found" });
  }

  await writeData(filteredSnippets);
  res.status(204).send(); // No content response
});

module.exports = router;
