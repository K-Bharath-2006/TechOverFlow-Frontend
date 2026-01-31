import { useNavigate } from "react-router-dom";

const QuestionCard = ({ questions }) => {
  const navigate = useNavigate();
  
return (
  <div className="qCon">
    {questions.map((data) => (
      <div
        className="q"
        key={data._id}
        onClick={() => navigate(`/question/${data._id}`)}
      >
        <h4>{data.title}</h4>

        <p>Description : {data.description}</p>

        <div className="tags">
          {data.tags.map((tag, idx) => (
            <span className="tag" key={idx}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);
}

export default QuestionCard;
