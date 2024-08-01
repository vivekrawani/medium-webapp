import FullBlog from "@/components/FullBlog";
import { FetchSingleBlog } from "@/hooks/fetchBlogs";
import { useParams } from "react-router-dom";

export default function SingleBlog() {
  const { id = "" } = useParams();
  const { loading, blog } = FetchSingleBlog(id);
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <FullBlog
        title={"title"}
        authorName={"vivek"}
        publishDate={"12 march 2022"}
        content={"sadf"}
      />
    </div>
  );
}
