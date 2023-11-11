import {
  LucideCalendarDays,
  LucideCamera,
  LucideFileSpreadsheet,
  LucideGamepad2,
  LucideHelpingHand,
  LucideImage,
  LucideMailbox,
  LucideStore,
  LucideTimer,
  LucideTv2,
  LucideUserCheck,
  LucideUsers,
  LucideVideo,
} from "lucide-react";

export const SideBarLinks = [
  {
    name: "Friends",
    icon: <LucideUserCheck className="text-emerald-500" size="1.5rem" />,
  },
  {
    name: "Groups",
    icon: <LucideUsers className="text-emerald-500" size="1.5rem" />,
  },
  {
    name: "Marketplace",
    icon: <LucideStore className="text-emerald-500" size="1.5rem" />,
  },
  {
    name: "Watch",
    icon: <LucideTv2 className="text-emerald-500" size="1.5rem" />,
  },
  {
    name: "Memories",
    icon: <LucideTimer className="text-emerald-500" size="1.5rem" />,
  },
];

export const SideBarShortcuts = [
  {
    name: "Events",
    icon: <LucideCalendarDays className="text-emerald-500" size="1.5rem" />,
  },
  {
    name: "Gaming",
    icon: <LucideGamepad2 className="text-emerald-500" size="1.5rem" />,
  },
  {
    name: "Gallery",
    icon: <LucideImage className="text-emerald-500" size="1.5rem" />,
  },
  {
    name: "Videos",
    icon: <LucideVideo className="text-emerald-500" size="1.5rem" />,
  },
  {
    name: "Messages",
    icon: <LucideMailbox className="text-emerald-500" size="1.5rem" />,
  },
];

export const OthersLink = [
  {
    name: "Fundraiser",
    icon: <LucideHelpingHand className="text-emerald-500" size="1.5rem" />,
  },
  {
    name: "Tutorials",
    icon: <LucideCamera className="text-emerald-500" size="1.5rem" />,
  },
  {
    name: "Courses",
    icon: <LucideFileSpreadsheet className="text-emerald-500" size="1.5rem" />,
  },
];
