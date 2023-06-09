"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import PromptCard from "@components/PromptCard";
const PromptCardList = ({ data, handleTagClick }) => {
  if (data.length === 0) return <CircularProgress className="mt-6" />;
  return (
    <div className="mt-6 prompt_layout ">
      {data.reverse().map((post, index) => {
        return <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />;
      })}
    </div>
  );
};
const userProfile = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);

      const data = await response.json();

      setUserData(data);
    };

    fetchPosts();
  }, [session]);
  if (userData === undefined) return;
  console.log(userData);
  if (session?.user.id === params?.id) return router.push("/profile");
  return (
    <section className="profile text-white flex flex-col items-center justify-center">
      <h1 className="blue_gradient_user">
        <span className="text-white">Профиль пользователя</span> {userData[0].creator.username}
      </h1>
      <p className="desc text-center desc_user">
        Добро пожаловать на персональную страницу <span className="firstletter">{userData[0].creator.username}.</span>
      </p>
      <p className="desc text-center">
        Постов: {userData.length} |{" "}
        {userData[0].creator.username === "sabotage" ? <span className="text-red-600"> Администратор</span> : "Пользователь"}
      </p>
      <PromptCardList data={userData} />
    </section>
  );
};

export default userProfile;
