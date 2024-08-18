import api, { apiWithToken } from "@/config/api";
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
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    apiWithToken
      .get("/blog")
      .then((response) => {
        console.log(response.data);
        setBlogs(response.data);
        setLoading(false);
      })
      .catch(() => {
        // console.error(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  return { blogs, loading, error };
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
