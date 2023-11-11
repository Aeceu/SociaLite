import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LucideEdit, LucideEdit3, LucideUsers2 } from "lucide-react";
import { UserStore } from "../state/UserStore";
import EditProfile from "../components/EditProfile";
import DisplayInfo from "../components/DisplayInfo";
import ProfileFeed from "../components/ProfileFeed";

export default function Profile() {
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const user = UserStore((state) => state.user);
  const userProfile = UserStore((state) => state.userProfile);
  const HandleGetUserProfileData = UserStore(
    (state) => state.HandleGetUserProfileData
  );

  useEffect(() => {
    if (id) HandleGetUserProfileData(id);
  }, [HandleGetUserProfileData, id]);

  return (
    <div className="w-3/4 p-4 overflow-y-scroll h-[calc(100vh-50px)]">
      <div className="w-full  bg-gray-200 p-4 rounded-sm flex flex-col items-center justify-center ">
        <div className="group w-full relative flex items-center justify-center mb-10 overflow-visible">
          {id === user?._id && (
            <LucideEdit3
              size="1rem"
              className="bg-white rounded-full w-[25px] h-[25px] p-1 group-hover:flex hidden  absolute top-3 right-3 text-emerald-500 cursor-pointer shadow-xl"
            />
          )}
          <img
            src="/bg.jpg"
            alt="cover-photo"
            className="rounded-sm w-full h-[200px] object-cover"
          />
          <div className="rounded-full border-[3px] border-blue-500 w-max p-1 absolute -bottom-10 ">
            <img
              src="/pfp2.jpg"
              alt="pfp"
              className="w-[70px] object-cover rounded-full"
            />
          </div>
        </div>
        <h1>{`${userProfile?.firstname} ${userProfile?.lastname}`}</h1>
        <div className="w-full h-[1px] border-b my-4 border-gray-300" />
        <div className=" w-full flex gap-2 justify-between">
          <div className="relative w-full rounded-md bg-white p-4 text-xs flex flex-col gap-2 shadow-md">
            <h1 className="font-bold text-emerald-500">Informations</h1>
            {id === user?._id && (
              <LucideEdit
                onClick={() => setEditMode((prev) => !prev)}
                size="1rem"
                className={`absolute top-4 right-4 cursor-pointer hover:scale-125 transition-all duration-300  ${
                  editMode && "text-emerald-500"
                }`}
              />
            )}
            {editMode ? (
              <EditProfile setEditMode={setEditMode} />
            ) : (
              <DisplayInfo user={userProfile} />
            )}
          </div>
          <div className="w-full rounded-md bg-white p-4 text-xs flex flex-col gap-2 shadow-md">
            <span className="flex items-center gap-2 ">
              <LucideUsers2 size="1.3rem" className="text-emerald-500" />
              <b>Friends</b>
            </span>
          </div>
        </div>
      </div>
      {id && <ProfileFeed userID={id} />}
    </div>
  );
}
