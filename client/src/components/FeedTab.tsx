import { PostStore } from "../state/PostStore";
import { useEffect } from "react";
import LoadingAnim from "./LoadingAnim";
import PostCard from "./PostCard";

export default function FeedTab() {
  const loading = PostStore((state) => state.loading);
  const AllPosts = PostStore((state) => state.AllPosts);
  const GetAllPosts = PostStore((state) => state.GetAllPosts);

  useEffect(() => {
    GetAllPosts();
  }, [GetAllPosts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-2">
        <LoadingAnim className="text-red-500" size="1.3rem" />
      </div>
    );
  }
  if (AllPosts && AllPosts?.length <= 0) {
    return (
      <div className="flex items-center justify-center text-red-500 text-lg p-2 font-bold">
        No posts available....
      </div>
    );
  }
  return (
    <div className="mt-4 flex flex-col-reverse gap-4 ">
      {AllPosts?.map((post, i) => (
        <PostCard post={post} key={i} />
      ))}
    </div>
  );
}
