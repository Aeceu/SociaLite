import CreatePost from "../components/CreatePost";
import FeedTab from "../components/FeedTab";
import MyDays from "../components/MyDays";
import { UserStore } from "../state/UserStore";

export default function Home() {
  const user = UserStore((state) => state.user);

  return (
    <div className="w-3/4 h-screen overflow-y-scroll p-2 pb-16 gap-2">
      <MyDays />
      {user?._id && <CreatePost userID={user?._id} />}
      <FeedTab />
    </div>
  );
}
