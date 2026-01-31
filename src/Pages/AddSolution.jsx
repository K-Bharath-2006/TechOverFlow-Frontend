import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./../Styles/Solution.css"

function AddSolution() {
  let [ answer, setAnswer] = useState("");
  // eslint-disable-next-line
  let [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        `https://techoverflow-backend.onrender.com/api/question/add-solution/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ answer }),
        },
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Submission Failed");
        return;
      }
      navigate(`/question/${id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="solution">
      <form className="solutionForm" onSubmit={handleSubmit}>
        <h2>Add Solution</h2>
        <label>Solution</label>
        <textarea
          placeholder="Solution"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={6}
          cols={50}
          required
        ></textarea>
        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddSolution;
