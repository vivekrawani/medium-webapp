import api from "../../config/api";
import { useEffect, useState } from "react";
type Blog = {
  id: string;
  content: string;
  title: string;
  published: boolean;
  author: {
    name: string;
  };
};
export const FetchBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    api
      .get("/blog", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("medium-jwt-token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setBlogs(response.data);
        setLoading(false);
      });
  }, []);

  return { blogs, loading };
};

export const FetchSingleBlog = (id: string) => {
  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get(`/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("medium-jwt-token")}`,
        },
      })
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      });
  }, [id]);
  return { blog, loading };
};
