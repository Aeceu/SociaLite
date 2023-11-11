interface Props {
  user: UserDataProps | null;
}

export default function DisplayInfo({ user }: Props) {
  return (
    <>
      <span className="w-full flex items-center gap-2 ">
        <b>Username:</b>
        <p className="p-1">{user?.username}</p>
      </span>
      <span className="flex items-center gap-2 ">
        <b>Email:</b>
        <p className="p-1 ">{user?.email}</p>
      </span>
      <span className="flex items-center gap-2 ">
        <b>Age:</b>
        <p className="p-1">{user?.age}</p>
      </span>
      <span className="flex items-center gap-2 ">
        <b>Birthdate:</b>
        <p className="p-1">{user?.bdate}</p>
      </span>
    </>
  );
}
