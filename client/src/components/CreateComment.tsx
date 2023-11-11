import { LucideSend } from "lucide-react";
import { useState, Dispatch, SetStateAction, useRef } from "react";
import { UserStore } from "../state/UserStore";
import { PostStore } from "../state/PostStore";
import AutoResize from "../hooks/AutoResize";

interface Props {
  postID: string;
  setComments: Dispatch<SetStateAction<commentsProps[] | null>>;
}

export default function CreateComment({ postID, setComments }: Props) {
  const [newComment, setNewComment] = useState("");
  const user = UserStore((state) => state.user);
  const HandleCreateComment = PostStore((state) => state.HandleCreateComment);
  const HandleGetComments = PostStore((state) => state.HandleGetComments);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  AutoResize(textRef.current, newComment);

  const createComment = async () => {
    const text = encodeURIComponent(newComment);
    const decodedText = decodeURIComponent(text.replace(/%0A/g, "\n"));
    if (user?._id)
      await HandleCreateComment({
        comment: decodedText,
        postID,
        userID: user?._id,
      }).then(() => {
        HandleGetComments(postID).then((res) => {
          setComments(res);
        });
      });
    setNewComment("");
  };

  return (
    <div>
      <div className=" m-2 flex items-center gap-2 p-1">
        <img
          src="/pfp2.jpg"
          alt="logo"
          className="rounded-full w-[25px] h-[25px] object-cover"
        />
        <textarea
          ref={textRef}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="comment something..."
          className="resize-none outline-none bg-inherit w-full border-b"
          cols={1}
          rows={1}
        />
        <LucideSend
          size="1rem"
          className="text-emerald-500"
          onClick={createComment}
        />
      </div>
    </div>
  );
}
