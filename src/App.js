import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Common/Header';
import { useEffect, useState } from 'react';
import Footer from './Common/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  let [questions,setQuestions] = useState([]);

  useEffect(()=>{
    const fetchQuestions = async ()=> {
      try {
        const res = await fetch("http://localhost:9000/api/question",{
          method: "GET",
        });
        const data = await res.json();
        
        setQuestions(data.data);
      } catch (error) {
      }
    };
    fetchQuestions();
  },[]);

  return (
    <div className="App">
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <Outlet
        context = {{
          questions,
          setQuestions,
        }}
      ></Outlet>
      <Footer />
    </div>
  );
}

export default App;
