import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Промпты & Запросы
        <br className="" />
        <span className="head_text orange_gradient">Создано с использованием AI</span>
      </h1>

      <p className="desc text-center">
        Prompt — это приложение, позволяющее находить, создавать и делиться творческими запросами к ChatGPT, либо любым другим нейронным
        сетям. Войдите и отправьте свой первый Prompt!
      </p>
      <h3 className=" text-center orange_gradient mt-5 text-2xl"> Next.js | React | MongoDB | NextAuth</h3>
      <Feed />
    </section>
  );
};

export default Home;
