import { CircularProgress } from "@mui/material";
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {type} Промпт</span>
      </h1>
      <p className="desc text-left max-w-md">
        Создавайте потрясающие запросы и делитесь ими с другими пользователями, дайте волю своему воображению с любой платформой на базе
        искусственного интеллекта.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism text-white">
        <label>
          <span className="font-satoshi font-semibold text-base text-white">Основной текст </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Введите ваш промпт"
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-white">
            Тег {``} <span className="font-normal">(#AI, #JokerStudio, #idea)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#Тег"
            required
            className="form_input text-white"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Отмена
          </Link>
          <button type="submit" disabled={submitting} className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
            {submitting ? `Сохранение...` : "Сохранить"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
