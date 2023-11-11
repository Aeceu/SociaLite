import { motion } from "framer-motion";
import { LucideX } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AutoResize from "../../hooks/AutoResize";
import { PostStore } from "../../state/PostStore";

interface Props {
  setModal: Dispatch<SetStateAction<boolean>>;
  post: AllPostsProps;
}

export default function PopOver({ setModal, post }: Props) {
  const [newpost, setNewPost] = useState("");
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  AutoResize(textRef.current, newpost);
  const HandleUpdatePost = PostStore((state) => state.HandleUpdatePost);
  const GetAllPosts = PostStore((state) => state.GetAllPosts);
  useEffect(() => {
    setNewPost(post.post);
  }, [post.post]);

  const updatePost = async () => {
    await HandleUpdatePost({
      id: post._id,
      post: newpost,
    }).then(() => {
      GetAllPosts();
    });
  };

  return (
    <motion.div
      className="relative rounded-md bg-white border shadow-md w-1/2 "
      initial={{
        scale: 0,
      }}
      animate={{ scale: 1 }}
      transition={{
        duration: "0.1",
      }}
    >
      <LucideX
        size="1rem"
        className="absolute top-2 right-3"
        onClick={() => setModal(false)}
      />
      <div className="flex flex-col items-start gap-2  p-2">
        <span className="w-full text-sm flex items-center gap-2 ">
          <img
            src="/pfp1.jpg"
            alt="pfp"
            className="object-cover rounded-full w-[30px] h-[30px]"
          />
          <Link
            to={`/profile/${post.creator._id}`}
            className="text-xs hover:text-blue-500 hover:underline w-max"
          >
            @ {post.creator.username}
          </Link>
        </span>
        <textarea
          ref={textRef}
          value={newpost}
          onChange={(e) => setNewPost(e.target.value)}
          className="w-full outline-none break-words border rounded-md p-2"
          cols={1}
          rows={3}
        />
      </div>
      <span className="w-full flex items-center justify-end gap-2 text-xs px-2 py-1">
        <button
          onClick={updatePost}
          type="button"
          className="bg-emerald-500 p-1 rounded-sm text-white font-bold"
        >
          save
        </button>
      </span>
    </motion.div>
  );
}
