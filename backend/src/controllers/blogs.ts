import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@vivek_kr/medium-common";

export const createBlog = async (c: Context) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.text("invalid details");
  }
  const authorId = c.get("userId");
  const { DATABASE_URL, JWT_SECRET } = c.env;
  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.blog.create({
      data: {
        title: body.title as string,
        content: body.content as string,
        authorId: authorId as string,
      },
    });
    return c.json(post);
  } catch (error) {
    console.error(error);
    return c.text("error");
  }
};

export const updateBlog = async (c: Context) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.text("invalid details");
  }
  const authorId = c.get("userId");
  const { DATABASE_URL, JWT_SECRET } = c.env;
  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title as string,
        content: body.content as string,
        authorId: authorId as string,
      },
    });
    return c.json(post);
  } catch (error) {
    console.error(error);
    return c.text("error");
  }
};

export const getBlogs = async (c: Context) => {
  const { DATABASE_URL, JWT_SECRET } = c.env;
  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const posts = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        premiumBlog : true,
        publishDate : true,
        updateAt : true,

        author: {
          select: {
            name: true,
            avatarURL : true
          },
        },
      },
    });

    return c.json(posts);
  } catch (error) {
    console.error(error);
    return c.text("error");
  }
};

export const getBlog = async (c: Context) => {
  const params = c.req.param();
  console.log(params);
  const { DATABASE_URL, JWT_SECRET } = c.env;
  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.blog.findUnique({
      where: {
        id: params.id,
      },
      select : {
        title : true,
        content : true,
        published : true,
      }
    });

    return c.json(post);
  } catch (error) {
    console.error(error);
    return c.text("error");
  }
};
