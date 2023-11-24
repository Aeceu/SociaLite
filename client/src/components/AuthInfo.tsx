import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function AuthInfo() {
  return (
    <div className="w-[45%] md:flex hidden flex-col ">
      <span className=" text-8xl flex items-center ">
        <h1 className="p-2 text-cursive text-emerald-500  drop-shadow-red-md">
          Socio
        </h1>
        <h1 className="p-2.5 text-cursive text-red-500 drop-shadow-green-md">
          Lite
        </h1>
      </span>

      <p className="text-lg font-bold text-red-500">
        Unlock a World of Interactions - Welcome to Social Media: Your Gateway
        to Global Networking.
      </p>
      <h1 className="text-lg mt-4 hover:underline text-indigo-500 cursor-pointer">
        Support my socials:
      </h1>
      <div className="flex gap-2 py-2">
        <Link to="https://github.com/kaneki081" className="text-indigo-500 ">
          <FaGithub size="1.5rem" />
        </Link>
        <Link
          to="https://www.linkedin.com/in/jose-acebuche-4a5b851b5/"
          className="text-indigo-500 "
        >
          <FaLinkedin size="1.5rem" />
        </Link>
        <Link
          to="https://www.facebook.com/Aeceuuu"
          className="text-indigo-500 "
        >
          <FaFacebook size="1.5rem" />
        </Link>
      </div>
    </div>
  );
}
