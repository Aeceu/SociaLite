import { Dispatch, SetStateAction } from "react";
import PopOver from "../animation/PopOver";

interface Props {
  setModal: Dispatch<SetStateAction<boolean>>;
  post: AllPostsProps;
}
export default function EditPost({ setModal, post }: Props) {
  return (
    <div className="z-50 bg-black/70 w-full h-screen flex items-center justify-center fixed top-0 left-0">
      <PopOver setModal={setModal} post={post} />
    </div>
  );
}
