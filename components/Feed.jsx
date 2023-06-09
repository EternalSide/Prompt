"use client";

import { useState, useEffect, useRef } from "react";
import PromptCard from "./PromptCard";
import { CircularProgress } from "@mui/material";
import End from "./End";
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
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");

    const data = await response.json();
    setPosts(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const inputRef = useRef();
  const handleSearchChange = (e) => {
    e.preventDefault();
    const searchValue = inputRef.current.value;
    setSearchText(searchValue);
    const filteredResults = posts.filter((post) => {
      if (post.prompt.includes(searchText)) {
        return post;
      }
    });
    return filteredResults;
  };

  const filteredResults = posts.filter((post) => post.prompt.includes(searchText));

  return (
    <section className="feed">
      <form className="relative w-full flex-center ">
        <input
          ref={inputRef}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Поиск по тегу, имени, символам"
          required
          className="search_input peer"
        />
      </form>
      <h2 className="head_text text-center head_text_popular">Популярное:</h2>
      <div className="flex flex-wrap  justify-center gap-6 text-center s">
        <p
          className="font-inter text-lg blue_gradient cursor-pointer hover:underline"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #ВебРазработка
        </p>
        <p
          className="font-inter text-lg blue_gradient cursor-pointer hover:underline"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #Музыка
        </p>
        <p
          className="font-inter text-lg blue_gradient cursor-pointer hover:underline"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #CHATGPT
        </p>
        <p
          className="font-inter text-lg blue_gradient cursor-pointer hover:underline"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #Расскажи
        </p>
      </div>
      <PromptCardList data={filteredResults} handleTagClick={() => {}} />
      <End />
    </section>
  );
};

export default Feed;
