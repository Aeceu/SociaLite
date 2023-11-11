import { LucideThumbsUp } from "lucide-react";
import { PostStore } from "../state/PostStore";
import { useState, useEffect } from "react";

interface Props {
  postID: string;
  userID: string;
}
export default function Likes({ postID, userID }: Props) {
  const [likes, setLikes] = useState(0);
  const HandleLikes = PostStore((state) => state.HandleLikes);
  const HandlePostLikes = PostStore((state) => state.HandlePostLikes);

  const HandleClickLike = async () => {
    try {
      if (userID) {
        await HandleLikes({ postID, userID });
      }
      HandlePostLikes(postID).then((res) => {
        setLikes(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    HandlePostLikes(postID).then((res) => {
      setLikes(res);
    });
  }, [HandlePostLikes, postID]);
  return (
    <span className="flex items-start gap-1">
      <LucideThumbsUp
        onClick={HandleClickLike}
        size={"1rem"}
        className="text-blue-500 hover:scale-110 transition-all duration-300 cursor-pointer"
      />
      <p className="text-[12px]">{likes}</p>
    </span>
  );
}
