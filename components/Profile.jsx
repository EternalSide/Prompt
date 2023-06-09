import PromptCard from "./PromptCard";
import { CircularProgress } from "@mui/material";
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  if (data === undefined) {
    return (
      <section className="w-full flex flex-col items-center justify-center">
        <h1 className="head_text text-left">
          <span className="blue_gradient_user">{name} Профиль</span>
        </h1>
        <p className="desc text-left">{desc}</p>
        <CircularProgress className="mt-10" />
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <h1 className="head_text text-left">
        <span className="blue_gradient_user">{name} Профиль</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data?.length === 0 && <p className="text-left wh">Вы еще не создали ни одного промпта :(</p>}
        {data?.reverse().map((post, index) => {
          return (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Profile;
