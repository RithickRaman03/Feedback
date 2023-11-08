const express = require("express");
const router = express.Router();

const pool = require("../config/database");

router.get("/translatorfeedback", async (req, res) => {
  const result = await pool.query("SELECT * FROM feedbackquestions");
  console.log(result);
  res.json(result.rows);
});
// router.post("/store-feedback", async (req, res) => {
//   const { feedback } = req.body;
//   console.log(feedback);
//   const feedans = await pool.query(
//     "INSERT INTO feedback WHERE (id,question_id,file_id,answer,role_id)VALUES($1,$2,$3,$4,$5)"
//   );
//   console.log(feedans);
//   req.body(feedans.rows);
// });

router.post("/store-feedback", async (req, res) => {
  try {
    const { feedback } = req.body;

    let question_id = 1; // Initialize question_id

    for (const feedbackItem of feedback) {
      const { file_id, answer } = feedbackItem;
      const role_id = 1; // Assuming role_id is constant

      const feedans = await pool.query(
        "INSERT INTO feedback (question_id, file_id, answer, role_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [question_id, file_id, answer, role_id]
      );

      console.log(feedans.rows[0]);

      question_id++; // Increment question_id for the next feedback item
    }

    res.json({ message: "Feedback data inserted successfully" });
  } catch (error) {
    console.error("Error inserting feedback data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
});

module.exports = router;
