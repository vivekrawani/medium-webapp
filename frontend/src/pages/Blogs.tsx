import { BlogCard } from "@/components/BlogCard";
import { useBlogs } from "@/hooks/fetchBlogs";

export default function Blogs() {
  const { blogs, loading } = useBlogs();
  if (loading) {
    return <div>Loading ... </div>;
  }
  return (
    <div>
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
  );
}
