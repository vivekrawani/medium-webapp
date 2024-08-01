import { Avatar } from "./BlogCard";

export default function Navbar() {
  return (
    <div className="flex justify-between px-10 py-3 w-full border-b">
      <div className="font-bold text-2xl">
        <div>Medium</div>
      </div>
      <div>
        <Avatar name="gita" size="big"/>
      </div>
    </div>
  );
}
