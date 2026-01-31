import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import "./../Styles/Question.css";
import { toast } from "react-toastify";
const Question = () => {
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  const isUser = user?.Role === "user";
  const isAdmin = user?.Role === "admin";
  const token = localStorage.getItem("token");
  let [res, setRes] = useState(null);
  const navigate = useNavigate();
  const { setQuestions } = useOutletContext();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://techoverflow-backend.onrender.com/api/question/${res._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to delete question");
        return;
      }

      toast.success("Question deleted successfully");

      setQuestions((prev) => prev.filter((q) => q._id !== id));
      navigate("/admin-home");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(
          `https://techoverflow-backend.onrender.com/api/question/${id}`,
          {
            method: "GET",
          },
        );

        const question = await response.json();
        setRes(question.data);
      } catch (error) {}
    };
    fetchQuestion();
  }, [id]);

  if (!res) {
    return <h2>Loading ...</h2>;
  }

  return (
    <div className="question-card">
      <h2 className="title">{res.title}</h2>
      <p className="desc">{res.description}</p>

      <div className="tags">
        {res.tags.map((tag, idx) => (
          <span className="tag" key={idx}>
            {tag}
          </span>
        ))}
      </div>
      <div className="solutions">
        <h3>Solutions</h3>
        <ul>
          {res.solutions.map((sol) => (
            <li key={sol._id}>
              <p>{sol.answer}</p>
              {/* <small>
                Answered on {new Date(sol.createdAt).toLocaleDateString()}
              </small> */}
            </li>
          ))}
        </ul>
      </div>
      <div className="actions">
        {isAdmin && (
          <button className="delete-btn" onClick={handleDelete}>
            Delete Question
          </button>
        )}

        {isUser && (
          <button
            className="add-btn"
            onClick={() => navigate(`/add-solution/${res._id}`)}
          >
            Add Solution
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
