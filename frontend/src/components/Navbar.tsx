import { Avatar } from "./BlogCard";
import { FaRegEdit } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import useTheme from "@/hooks/useTheme";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import type { User } from "@/lib/types";
type BannerMessage = {
  left: string;
  right: string;
};
export default function Navbar() {
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user);
  const message: BannerMessage | null = null;
  return (
    <div className="bg-white dark:bg-black">
      <div
        className={`flex justify-between  pl-20 pr-10 ${user ? "py-2" : "py-5"} w-full border-b`}
      >
        <div>
          <div className="flex flex-row gap-4">
            <div className="font-bold text-3xl">Medium </div>{" "}
            {user && <SearchBox />}
          </div>
        </div>
        <div>
          <RightDiv user={user} />
        </div>
      </div>
      <Banner message={message} />
    </div>
  );
}
function Banner({ message }: { message: BannerMessage | null }) {
  if (message !== null)
    return (
      <div className="flex justify-center items-center gap-2 h-10 bg-pink-50 font-medium">
        {message?.left}
        <Link to="#" className="underline">
          {message?.right}
        </Link>
      </div>
    );
}

function RightDiv({ user }: { user: User | null }) {
  if (user) {
    return (
      <div className="flex flex-row gap-5 place-items-center">
        <div className="flex flex-row gap-2 place-items-center text-md ">
          <ToggleTheme />
          <Link to="/publish">
            <span className="flex flex-row gap-1">
              <FaRegEdit className="text-xl" /> Write{" "}
            </span>
          </Link>
        </div>

        <div className="text-xl">
          <IoMdNotificationsOutline />
        </div>
        <div>
          <Avatar name={user.name} size="big" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row items-center gap-4">
      <ToggleTheme />
      <Link to="/about"> Our story </Link>
      <Link to="/membership"> Membership</Link>
      <Link to="/signin">Sign in </Link>
      <Link to="/signup">
        <Button className="rounded-full"> Get Started </Button>
      </Link>
    </div>
  );
}

function SearchBox() {
  return (
    <div className="text-lg">
      <input
        type="text"
        placeholder="Search..."
        className="bg-gray-100 rounded-full px-4 py-1 outline-none"
      />
    </div>
  );
}

function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      onClick={toggleTheme}
      className="p-2 text-xl rounded cursor-pointer mr-10"
    >
      {theme === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
    </div>
  );
}
