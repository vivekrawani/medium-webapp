// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
import { useBlogs } from "@/hooks/fetchBlogs";
import { BlogCard } from "@/components/BlogCard";

export default function Home() {
  // const navigate = useNavigate();
  const { blogs, loading, error } = useBlogs();
  if (loading) {
    return <div>Loading ... </div>;
  }
  if (error) {
    return <div>Error while loading ... </div>;
  }
  return (
    <div className="mx-10 md:mx-20 lg:mx-40 md:grid md:grid-cols-12 md:gap-5 h-screen">
      <div className="col-span-8">
        <BlogCard
          id={"1"}
          authorName={"vivek"}
          title={"how win a lottery"}
          content={"not possible"}
          publishedDate={"march 19"}
        />
        {blogs?.map((blog, index) => (
          <BlogCard
            key={index}
            id={blog.id}
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            publishedDate={"19 march"}
          />
        ))}
      </div>
      <div className="hidden md:block border-l-[1px] border-gray-100"> </div>
      <div className="col-span-1"> Right </div>
    </div>
  );
}
