import { useOutletContext } from "react-router-dom";
import QuestionCard from "../Components/QuestionCard";
import { useState } from "react";
import "./../Styles/AdminHome.css"
import Hero from "../Components/Hero";
import AboutBrand from "../Components/AboutBrand";

const AdminHome = () => {
  const {questions}  = useOutletContext();
  let [search,setSearch] = useState();
  return (
    <div className="home">
        <Hero />
        <AboutBrand />
      <h2>Newest Questions</h2>
      <input
        type="text"
        className="search"
        placeholder="Search questions by tag ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <QuestionCard questions={questions} />
    </div>
  );
};

export default AdminHome;
