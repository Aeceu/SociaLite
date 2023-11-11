import {
  LucideMessageCircle,
  LucideMoreVertical,
  LucideShare,
} from "lucide-react";
import { Link } from "react-router-dom";
import { LegacyRef, useRef, useState } from "react";
import AutoToggle from "../hooks/AutoToggle";
import { PostStore } from "../state/PostStore";
import EditPost from "./modal/EditPost";
import { UserStore } from "../state/UserStore";
import Likes from "./Likes";
import CommentCard from "./CommentCard";

interface PostCardProps {
  post: AllPostsProps;
}

export default function PostCard({ post }: PostCardProps) {
  const [toggle, setToggle] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  AutoToggle({ setToggle, tagRef: divRef });
  const user = UserStore((state) => state.user);

  return (
    <div>
      <div className="relative min-h-[100px]  bg-white rounded-lg p-2 border shadow-md flex flex-col justify-center gap-2">
        <Modal_Dot
          divRef={divRef}
          post={post}
          postCreatorID={post.creator._id}
          setToggle={setToggle}
          toggle={toggle}
        />
        <div className="flex flex-col items-start gap-2 rounded-md border p-2">
          <span className="w-full text-sm  flex items-center gap-2">
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
          <div
            dangerouslySetInnerHTML={{
              __html: post.post.replace(/\n/g, "<br>"),
            }}
            className="break-words"
          />
        </div>
        <span className="flex items-center gap-8 px-4">
          {user?._id && <Likes postID={post._id} userID={user._id} />}
          <LucideMessageCircle
            size={"1rem"}
            className=" text-emerald-500 hover:scale-110 transition-all duration-300 cursor-pointer"
            onClick={() => setCommentToggle((prev) => !prev)}
          />
          <LucideShare size={"1rem"} className="text-amber-500" />
        </span>
      </div>
      <CommentCard
        toggle={commentToggle}
        postID={post._id}
        setCommentToggle={setCommentToggle}
      />
    </div>
  );
}

interface Props {
  postCreatorID: string;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  post: AllPostsProps;
  toggle: boolean;
  divRef: LegacyRef<HTMLDivElement> | undefined;
}

const Modal_Dot = ({
  postCreatorID,
  setToggle,
  post,
  toggle,
  divRef,
}: Props) => {
  const [modal, setModal] = useState(false);
  const user = UserStore((state) => state.user);
  const HandleDeletePost = PostStore((state) => state.HandleDeletePost);
  const GetAllPosts = PostStore((state) => state.GetAllPosts);

  const deletePost = async () => {
    await HandleDeletePost(post._id).then(() => {
      GetAllPosts();
    });
  };
  const showModal = () => {
    setModal(true);
  };
  return (
    <>
      {user?._id === postCreatorID && (
        <LucideMoreVertical
          size=".8rem"
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setToggle((prev) => !prev)}
        />
      )}
      {modal && <EditPost setModal={setModal} post={post} />}
      {toggle && (
        <div
          ref={divRef}
          className="flex flex-col gap-2 items-center absolute top-10 right-0 text-xs rounded-md px-2 py-1 bg-white border shadow-md"
        >
          <button
            type="button"
            className="text-emerald-500 font-bold"
            onClick={showModal}
          >
            Edit
          </button>
          <button
            onClick={deletePost}
            type="button"
            className="text-red-500 font-bold"
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};
