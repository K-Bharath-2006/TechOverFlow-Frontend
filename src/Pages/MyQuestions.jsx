import { useEffect, useState } from "react";
import QuestionCard from "../Components/QuestionCard";
import "./../Styles/Home.css";


const MyQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyQuestions = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/question/my-questions", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setQuestions(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyQuestions();
  }, [token]);

  if (!questions) {
    return <h2>Loading ...</h2>;
  }

  return (
    <div className="home">
      <h2>My Questions</h2>
      <div>
        <QuestionCard questions={questions}/>
      </div>
    </div>
  );
};

export default MyQuestions;
