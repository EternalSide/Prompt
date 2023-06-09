"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");
  const pathName = usePathname();
  const router = useRouter();
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  const [readMore, setReadMore] = useState(false);
  return (
    <div className="prompt_card card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start item-center gap-3 cursor-pointer">
          <Link href={`/profile/${post.creator._id}`}>
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-cover hover:opacity-80 hover:duration-300"
            />
          </Link>
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-white firstletter">{post.creator.username}</h3>
            <p style={{ color: "#7c838f" }} className="font-inter text-sm ">
              Ну и что вы хотите от меня услышать?
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"} width={15} height={15} />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-white">
        {post.prompt.length < 285 ? (
          post.prompt
        ) : (
          <>
            {!readMore && (
              <>
                {post.prompt.slice(0, 285)}.. <br></br>
                <button
                  className="mt-3 orange_gradient hover:underline"
                  onClick={() => {
                    setReadMore((prev) => !prev);
                  }}
                >
                  Читать далее
                </button>
              </>
            )}
            {readMore && (
              <>
                {post.prompt} <br></br>
                <button
                  className="mt-3 orange_gradient hover:underline"
                  onClick={() => {
                    setReadMore((prev) => !prev);
                  }}
                >
                  Свернуть
                </button>
              </>
            )}
          </>
        )}
      </p>
      <p className="font-inter text-sm blue_gradient cursor-pointer blue_gradient_hash hover:underline" onClick={() => {}}>
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-700 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>
            Редактировать
          </p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>
            Удалить
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
