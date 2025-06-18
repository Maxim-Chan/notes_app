import db from "../config/db.js";

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
  const updatableFields = ["category", "title", "content"];
  const updatedFields = [];
  const values = [];
  let index = 1;

  for (let field of updatableFields) {
    if (req.body[field] !== undefined) {
      updatedFields.push(`${field} = $${index}`);
      values.push(req.body[field]);
      index++;
    }
  }

  if (updatedFields.length === 0) {
    return res.status(400).json({ error: "No updates requested" });
  }

  values.push(id);

  try {
    let query = `UPDATE notes SET ${updatedFields.join(
      ", "
    )} WHERE id = $${index} RETURNING *`;

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "success" });
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
