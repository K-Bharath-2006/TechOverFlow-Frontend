import "./../Styles/Forms.css";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

const QuestionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { setQuestions } = useOutletContext();

  const onSubmitHandler = async (fdata) => {
    try {
      const res = await fetch("http://localhost:9000/api/question", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fdata),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.msg || "Resgister Failed");
        return;
      }

      setQuestions((prev) => [data.data, ...prev]);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="question-form">
      <h1>Question Form</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <label>Question Title</label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          id="title"
        />
        {errors.title && <p>{errors.title.message}</p>}
        <label>Question Description</label>
        <textarea
          name="des"
          id="des"
          {...register("description")}
          cols={5}
          rows={7}
        ></textarea>
        <label>Tags </label>
        <input
          type="text"
          {...register(
            "tags",
            {
              setValueAs: (value) =>
                value
                  .split(",")
                  .map((t) => t.trim())
                  .filter((t) => t !== ""),
            },
            { required: "Aleast one tag is required" }
          )}
          id="tags"
        />
        {errors.tags && <p>{errors.tags.message}</p>}
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
};

export default QuestionForm;
