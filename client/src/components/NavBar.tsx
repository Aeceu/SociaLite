import { LucideHome, LucideMail, LucideMoon, LucideUser } from "lucide-react";
import { UserStore } from "../state/UserStore";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { AuthStore } from "../state/AuthStore";
import toast from "react-hot-toast";
import AutoToggle from "../hooks/AutoToggle";

export default function NavBar() {
  const [toggle, setToggle] = useState(false);
  const user = UserStore((state) => state.user);
  const handleLogout = AuthStore((state) => state.handleLogout);
  const navigate = useNavigate();
  const divRef = useRef<HTMLDivElement | null>(null);
  AutoToggle({ setToggle, tagRef: divRef });

  const logout = async () => {
    await handleLogout().then(() => {
      toast.success("User logout!");
      navigate("/login");
    });
  };

  return (
    <div className="bg-white w-full h-[50px] flex items-center justify-between px-8 border-b shadow-sm ">
      <div className="flex ">
        <h1 className="font-bold text-lg text-emerald-500">SociaLite</h1>
        <div className="flex items-center gap-2 px-4">
          <Link
            to="/"
            className="hover:scale-125 hover:text-emerald-500 transition-all duration-300"
          >
            <LucideHome size="0.9rem" />
          </Link>
          <button
            type="button"
            className="hover:scale-125 hover:text-emerald-500 transition-all duration-300"
          >
            <LucideMoon size="0.9rem" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Link
          to={`/profile/${user?._id}`}
          className="hover:scale-125 hover:text-emerald-500 transition-all duration-300"
        >
          <LucideUser className="" size="0.9rem" />
        </Link>
        <LucideMail
          className="hover:scale-125 hover:text-emerald-500 transition-all duration-300 cursor-pointer"
          size="0.9rem"
        />
        <img
          onClick={() => setToggle((prev) => !prev)}
          src="/pfp2.jpg"
          alt="icon"
          className="relative w-[30px] h-[30px] object-cover rounded-full cursor-pointer"
        />
        {toggle && (
          <div
            ref={divRef}
            className="bg-white px-2 py-1 rounded-md shadow-md absolute top-10 right-4 border flex items-center justify-center"
          >
            <button
              onClick={logout}
              type="button"
              className="text-[10px] text-red-500 font-bold"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
