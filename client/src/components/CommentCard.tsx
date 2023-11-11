import { Link } from "react-router-dom";
import { PostStore } from "../state/PostStore";
import CreateComment from "./CreateComment";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import SlideOut from "./animation/SlideOut";

interface Props {
  toggle: boolean;
  postID: string;
  setCommentToggle: Dispatch<SetStateAction<boolean>>;
}

export default function CommentCard({
  toggle,
  postID,
  setCommentToggle,
}: Props) {
  const [comments, setComments] = useState<commentsProps[] | null>(null);
  const HandleGetComments = PostStore((state) => state.HandleGetComments);

  useEffect(() => {
    HandleGetComments(postID).then((res) => {
      setComments(res);
    });
  }, [HandleGetComments, postID]);

  return (
    <SlideOut
      setToggle={setCommentToggle}
      toggle={toggle}
      className="text-xs bg-white mx-4 rounded-b-md shadow-md mb-2"
    >
      <CreateComment postID={postID} setComments={setComments} />
      {comments?.map((comment, i) => (
        <Card comment={comment} key={i} />
      ))}
    </SlideOut>
  );
}

interface CommentProps {
  comment: commentsProps;
}

const Card = ({ comment }: CommentProps) => {
  return (
    <div className="flex items-center gap-2  p-1 m-2">
      <img
        src="/pfp1.jpg"
        alt="pfp"
        className="object-cover rounded-full w-[25px] h-[25px]"
      />
      <span className="w-full bg-gray-100 flex flex-col justify-center rounded-md px-4 py-1 ">
        <Link
          to={`/profile/${comment.user.user_id}`}
          className="text-xs  hover:text-blue-500 hover:underline w-max font-bold"
        >
          {comment.user.username}
        </Link>
        <div
          dangerouslySetInnerHTML={{
            __html: comment.comment.replace(/\n/g, "<br>"),
          }}
          className="break-words text-sm"
        />
      </span>
    </div>
  );
};
