import { PostStore } from "../state/PostStore";
import LoadingAnim from "./LoadingAnim";
import PostCard from "./PostCard";
import { useEffect } from "react";

type Props = { userID: string };

export default function ProfileFeed({ userID }: Props) {
  const loading = PostStore((state) => state.loading);
  const GetUserPosts = PostStore((state) => state.GetUserPosts);
  const UserPosts = PostStore((state) => state.UserPosts);

  useEffect(() => {
    GetUserPosts(userID);
  }, [GetUserPosts, userID]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-2">
        <LoadingAnim className="text-red-500" size="1.3rem" />
      </div>
    );
  }
  if (UserPosts && UserPosts?.length <= 0) {
    return (
      <div className="flex items-center justify-center text-red-500 text-lg p-2 font-bold">
        No posts available....
      </div>
    );
  }
  return (
    <div className="mt-4 flex flex-col-reverse gap-4 ">
      {UserPosts?.map((post, i) => (
        <PostCard post={post} key={i} />
      ))}
    </div>
  );
}
