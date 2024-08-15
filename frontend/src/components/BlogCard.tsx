import { useNavigate } from "react-router-dom";
import { FaComment } from "react-icons/fa";
import { FaBookmark, FaHandsClapping } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";
import { FcRating } from "react-icons/fc";
interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer"
      onClick={() => navigate(`/blog/${id}`)}
    >
      <div className="flex">
        <Avatar name={authorName} />
        <div className="font-extralight pl-2 text-sm flex justify-center flex-col hover:underline">
          {authorName}
        </div>
      </div>
      <div className="text-2xl font-semibold pt-2">{title}</div>
      <div className="text-md text-gray-500">
        {content.slice(0, 100) + "..."}
      </div>
      <div className="flex flex-row  justify-between items-baseline gap-3">
        <div className="flex flex-row items-center gap-3 text-lg text-slate-500">
          <FcRating />
          <div className="text-sm ">{publishedDate}</div>
          <FaHandsClapping />
          <FaComment />
          <div className=" text-sm">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
          </div>
        </div>
        <div className="flex flex-row items-baseline gap-3 text-lg text-slate-500">
          <FaBookmark
            onClick={(e) => {
              e.stopPropagation();
              console.log("Bookmark");
              alert("Todo !!");
            }}
          />
          <SlOptions
            onClick={(e) => {
              e.stopPropagation();
              console.log("Bookmark");
              alert("Todo !!");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}
    >
      <span
        className={`${size === "small" ? "text-xs" : "text-md"} font-bold text-white dark:text-gray-300`}
      >
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}
