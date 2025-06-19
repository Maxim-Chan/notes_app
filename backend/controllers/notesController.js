import db from "../config/db.js";

export const getNote = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `SELECT * FROM notes WHERE id = $1`;
    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching note:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getAllNotes = async (req, res) => {
  const { categories } = req.query;

  try {
    let query = `SELECT * FROM notes`;
    const params = [];

    if (categories) {
      params = categories.split(",").map((c) => c.trim());
      const placeholder = params.map((p, i) => `$${i + 1}`).join(", ");

      query += ` WHERE category IN (${placeholder})`;
    }

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createNote = async (req, res) => {
  const { category, title, content } = req.body;
  const user_id = 1;

  if (!user_id || !title || !category) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let query = `INSERT INTO notes (user_id, category, title, content) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [user_id, category, title, content];

    const result = await db.query(query, values);

    res.json({ message: "success" });
  } catch (err) {
    console.error("Error creating note: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { category, title, content } = req.body;

  // Validate that all required fields are present
  if (!category || !title || content === undefined) {
    return res.status(400).json({ error: "Missing required fields: category, title, or content" });
  }

  try {
    const query = `
      UPDATE notes
      SET category = $1,
          title = $2,
          content = $3
      WHERE id = $4
      RETURNING *`;

    const values = [category, title, content, id];

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(result.rows[0]); // Return the updated note
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    let query = `DELETE FROM notes WHERE id = $1 RETURNING *`;

    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "success" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
