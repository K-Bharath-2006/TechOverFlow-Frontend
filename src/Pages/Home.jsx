import { useNavigate, useOutletContext } from "react-router-dom";
import "./../Styles/Home.css";
import QuestionCard from "./../Components/QuestionCard";
import { useState } from "react";
import Hero from "../Components/Hero";
import AboutBrand from "../Components/AboutBrand";

const Home = () => {
  const { questions } = useOutletContext();
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isUser = user?.Role === "user";
  

  return (
    <div className="home">
      <Hero />
      <AboutBrand />
      <h2 id="h">Newest Questions</h2>
      <input
        type="text"
        className="search"
        placeholder="Search questions by tag ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {isUser && (
        <div className="add">
          <button onClick={() => navigate(`add-question`)}>Add Question</button>
        </div>
      )}
      <QuestionCard questions={questions} />
    </div>
  );
};

export default Home;
