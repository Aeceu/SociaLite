import { Dispatch, SetStateAction, useState } from "react";
import { UserStore } from "../state/UserStore";
import LoadingAnim from "./LoadingAnim";
import toast from "react-hot-toast";

interface Props {
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

export default function EditProfile({ setEditMode }: Props) {
  const user = UserStore((state) => state.user);
  const loading = UserStore((state) => state.loading);
  const getUserData = UserStore((state) => state.getUserData);
  const HandleUpdateUserData = UserStore((state) => state.HandleUpdateUserData);
  const [formData, setFormData] = useState({
    username: user?.username,
    age: user?.age,
    bdate: user?.bdate,
    email: user?.email,
  });

  const handleSubmit = async () => {
    if (user && formData)
      await HandleUpdateUserData({ id: user?._id, formData }).then(
        ({ data, error }) => {
          if (data) {
            getUserData();
            toast.success(data.message);
            setEditMode(false);
          } else {
            toast.error(error);
            setEditMode(false);
          }
        }
      );
  };

  return (
    <>
      <span className="w-full flex items-center gap-2">
        <b className="">Username:</b>
        <input
          type="text"
          value={formData?.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className="outline-none w-full border p-1"
        />
      </span>
      <span className="flex items-center gap-2">
        <b>Email:</b>
        <input
          type="text"
          value={formData?.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="outline-none w-full border p-1"
        />
      </span>
      <span className="flex items-center gap-2">
        <b>Age:</b>
        <input
          type="number"
          value={formData?.age}
          onChange={(e) =>
            setFormData({ ...formData, age: Number(e.target.value) })
          }
          className="outline-none w-full border p-1"
        />
      </span>
      <span className="flex items-center gap-2">
        <b>Birthdate:</b>
        <input
          type="date"
          value={formData?.bdate}
          onChange={(e) => setFormData({ ...formData, bdate: e.target.value })}
          className="outline-none w-full border p-1"
        />
      </span>
      <span className="w-full flex items-center justify-end gap-2">
        <button
          onClick={() => setEditMode((prev) => !prev)}
          type="button"
          className="bg-red-500 px-1 py-1.5 rounded-sm text-white font-bold"
        >
          cancel
        </button>
        <button
          disabled={loading}
          onClick={handleSubmit}
          type="button"
          className="bg-emerald-500 px-1 py-1.5 rounded-sm text-white font-bold"
        >
          {loading ? <LoadingAnim /> : "save"}
        </button>
      </span>
    </>
  );
}
