import { useNavigate } from "react-router-dom";

const QuestionCard = ({ questions }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.Role === "admin";
  const handleDelete = () => {};
  return (
    <div className="qCon">
      {questions.map((data) => {
        return (
          <div
            className="q"
            onClick={() => navigate(`/question/${data._id}`)}
          >
            <h4>
            {data.title}
            </h4>
            <p>Description : {data.description}</p>
            <div className="tags">
              {data.tags.map((tag, idx) => {
                return (
                  <span className="tag" key={idx}>
                    {tag}
                  </span>
                );
              })}
            </div>
            {isAdmin && (
              <div className="delete">
                <button onClick={() => handleDelete}>Delete</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuestionCard;
