import { UserStore } from "../state/UserStore";
import { OthersLink, SideBarLinks, SideBarShortcuts } from "../utils/Links";

export default function SideBar() {
  const user = UserStore((state) => state.user);

  return (
    <div className="bg-white w-1/4 h-[calc(100vh-50px)] shadow-xl p-2 flex flex-col gap-3 overflow-y-scroll">
      <span className="flex items-center gap-2">
        <img
          src="/pfp2.jpg"
          alt="logo"
          className="rounded-full w-[25px] h-[25px] object-cover"
        />
        <h1 className="text-sm">{`${user?.firstname} ${user?.lastname}`}</h1>
      </span>
      {SideBarLinks.map((link, i) => (
        <span key={i} className="flex items-center gap-2">
          {link.icon}
          <h1 className="text-sm">{link.name}</h1>
        </span>
      ))}
      <div className="w-full h-[1px] border-b" />
      {SideBarShortcuts.map((sidebar, i) => (
        <span className="flex items-center gap-2" key={i}>
          {sidebar.icon}
          <h1 className="text-sm">{sidebar.name}</h1>
        </span>
      ))}
      <div className="w-full h-[1px] border-b" />
      {OthersLink.map((other, i) => (
        <span className="flex items-center gap-2" key={i}>
          {other.icon}
          <h1 className="text-sm">{other.name}</h1>
        </span>
      ))}
    </div>
  );
}
