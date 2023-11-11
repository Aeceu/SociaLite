import { LucideFeather, LucideImage, LucideSend } from "lucide-react";
import { useState, useRef } from "react";
import AutoResize from "../hooks/AutoResize";
import AutoToggle from "../hooks/AutoToggle";
import { PostStore } from "../state/PostStore";
import toast from "react-hot-toast";
import LoadingAnim from "./LoadingAnim";

export default function CreatePost({ userID }: { userID: string }) {
  const [post, setPost] = useState("");
  const [toggle, setToggle] = useState(false);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  AutoToggle({ setToggle, tagRef: divRef });
  AutoResize(textRef.current, post);
  const HandleNewPost = PostStore((state) => state.HandleNewPost);
  const createPostLoading = PostStore((state) => state.createPostLoading);
  const GetAllPosts = PostStore((state) => state.GetAllPosts);

  const createPost = async () => {
    const text = encodeURIComponent(post);
    const decodedText = decodeURIComponent(text.replace(/%0A/g, "\n"));
    await HandleNewPost({ post: decodedText, id: userID }).then(
      ({ data, error }) => {
        if (data) {
          toast.success(data.message);
          GetAllPosts();
          setPost("");
          setToggle(false);
        } else {
          toast.error(error);
          setPost("");
          setToggle(false);
        }
      }
    );
  };

  return (
    <div
      ref={divRef}
      className="mt-4 w-full rounded-md border flex flex-col  gap-2 bg-white shadow-md p-2  "
    >
      <div className="  flex items-center gap-2 p-1">
        <LucideFeather size="1rem" className="text-emerald-500" />
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          ref={textRef}
          placeholder="post something..."
          className="resize-none outline-none bg-inherit w-full text-xs"
          cols={1}
          rows={1}
        />
      </div>
      {toggle && (
        <div className="border-t w-full flex justify-between items-center px-1 pt-2">
          <LucideImage size="0.9rem" className="text-emerald-500" />
          {createPostLoading ? (
            <LoadingAnim />
          ) : (
            <LucideSend
              size="0.9rem"
              className="text-emerald-500"
              onClick={createPost}
            />
          )}
        </div>
      )}
    </div>
  );
}
