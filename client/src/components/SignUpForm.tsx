import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingAnim from "./LoadingAnim";
import { AuthStore } from "../state/AuthStore";
import { SignUpResetError } from "../hooks/ResetError";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    age: 0,
    bdate: "",
    email: "",
    password: "",
  });
  const handleSignUp = AuthStore((state) => state.handleSignUp);
  const loading = AuthStore((state) => state.loading);
  const error = AuthStore((state) => state.error);
  SignUpResetError({ formData });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSignUp(formData).then(({ data, error }) => {
      setFormData({
        username: "",
        firstname: "",
        lastname: "",
        age: 0,
        bdate: "",
        email: "",
        password: "",
      });
      if (data) {
        navigate("/login");
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
        Create a new account
      </h1>
      {error && <h1 className="text-red-500 text-xs text-center ">{error}</h1>}
      <div className="flex gap-2 items-center w-full">
        <span className="w-full flex flex-col gap-1 ">
          <label className="text-xs ">firstname</label>
          <input
            value={formData.firstname}
            onChange={(e) =>
              setFormData({ ...formData, firstname: e.target.value })
            }
            type="text"
            className="text-sm rounded-sm border  border-gray-300 outline-none px-1.5 py-2  "
          />
        </span>
        <span className="w-full flex flex-col gap-1 ">
          <label className="text-xs ">lastname</label>
          <input
            value={formData.lastname}
            onChange={(e) =>
              setFormData({ ...formData, lastname: e.target.value })
            }
            type="text"
            className="text-sm rounded-sm border  border-gray-300 outline-none px-1.5 py-2  "
          />
        </span>
      </div>
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
      <div className="flex gap-2 items-center w-full">
        <span className="w-full flex flex-col gap-1 ">
          <label className="text-xs ">age</label>
          <input
            value={formData.age}
            onChange={(e) =>
              setFormData({ ...formData, age: Number(e.target.value) })
            }
            type="number"
            className="text-sm rounded-sm border  border-gray-300 outline-none px-1.5 py-2  "
          />
        </span>
        <span className="w-full flex flex-col gap-1 ">
          <label className="text-xs ">birth date</label>
          <input
            value={formData.bdate}
            onChange={(e) =>
              setFormData({ ...formData, bdate: e.target.value })
            }
            type="date"
            className="text-sm rounded-sm border  border-gray-300 outline-none px-1.5 py-2  "
          />
        </span>
      </div>
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
        Already have an account ?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          log in here
        </Link>
      </span>
      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center text-white font-bold bg-slate-950  px-2 py-1.5 rounded-sm"
      >
        {loading ? <LoadingAnim /> : "Sign up"}
      </button>
    </form>
  );
}
