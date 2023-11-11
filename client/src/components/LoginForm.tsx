import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthStore } from "../state/AuthStore";
import LoadingAnim from "./LoadingAnim";
import { LoginResetError } from "../hooks/ResetError";
import toast from "react-hot-toast/headless";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleLogin = AuthStore((state) => state.handleLogin);
  const loading = AuthStore((state) => state.loading);
  const error = AuthStore((state) => state.error);
  LoginResetError({ formData });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(formData).then(({ data, error }) => {
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      if (data) {
        toast.success(data.message);
        console.log(data.message);

        navigate("/");
      } else {
        console.log(error);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col gap-2 justify-between p-4 bg-white rounded-r-md"
    >
      <h1 className="text-slate-950 font-bold text-2xl text-center">
        Login your account
      </h1>
      {error && <h1 className="text-red-500 text-xs text-center ">{error}</h1>}
      <span className="flex flex-col gap-1 ">
        <label className="text-xs ">username</label>
        <input
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          type="text"
          className="text-sm rounded-sm border  border-gray-300 outline-none px-1.5 py-2  "
        />
      </span>
      <span className="flex flex-col gap-1 ">
        <label className="text-xs ">email</label>
        <input
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          type="text"
          className="text-sm rounded-sm border  border-gray-300 outline-none px-1.5 py-2  "
        />
      </span>
      <span className="flex flex-col gap-1 ">
        <label className="text-xs ">password</label>
        <input
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          type="password"
          className="text-sm rounded-sm border  border-gray-300 outline-none px-1.5 py-2  "
        />
      </span>
      <span className="text-xs ">
        Don't have an account ?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          register in here
        </Link>
      </span>
      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center text-white font-bold bg-slate-950  px-2 py-1.5 rounded-sm"
      >
        {loading ? <LoadingAnim /> : "Log in"}
      </button>
    </form>
  );
}
