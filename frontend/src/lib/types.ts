type User = {
  id: string;
  name: string;
  avatarURL?: string;
  username?: string;
  email: string;
};

type Blog = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  publishDate: Date;
  updateAt: Date;
  premiumBlog: boolean;
  body: string[];
  author: {
      name: string | null;
      avatarURL: string | null;
  };
};
type Blog2 = Pick<Blog, "id" | "title" | "content" | "published" | "author" | "premiumBlog" | "publishDate" >;
export type { User, Blog, Blog2 };