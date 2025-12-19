import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./../Styles/Question.css";

const Question = () => {
  const { id } = useParams();
    
  const user = JSON.parse(localStorage.getItem("user"));
  const isUser = user?.Role === "user";
  let [res, setRes] = useState(null);
  useEffect(() => {
    const fetchQuestion = async ()=> {
      try {
        const response = await fetch(`http://localhost:9000/api/question/${id}`,{
          method: "GET",
        });
        
        const question = await response.json();
        setRes(question.data)
      } catch (error) {
      }
    };
    fetchQuestion();
  },[id]);

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
        <ol>
          {res.solutions.map((sol, idx) => (
            <li key={idx}>{sol}</li>
          ))}
        </ol>
      </div>
      {isUser && (
        <div className="add">
          <button>Add Solution</button>
        </div>
      )}
    </div>
  );
};

export default Question;
