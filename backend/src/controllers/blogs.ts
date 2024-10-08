import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@vivek_kr/medium-common";


function parseBody(jsonInput : any[]){
  const title = jsonInput.find(item => item.type === 'h1').body;
  const content = jsonInput.find(item=> item.type === 'p').body;
  if(title === undefined || content === undefined){
    return {
      success : false,
      main : undefined,
      title : undefined,
      content : undefined
    }
  } else {
    return {
      success : true,
      main : jsonInput.map(item=> `${item.type} ${item.body}`),
      title,
      content

    }
  }
}

export const createBlog = async (c: Context) => {
  const body = await c.req.json();
  // const { success } = createBlogInput.safeParse(body);
  // if (!success) {
  //   c.status(411);
  //   return c.text("invalid details");
  // }
  const {success, main, title, content} = parseBody(body)
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
        title: title as string,
        content: content as string,
        authorId: authorId as string,
        body : main
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
        premiumBlog: true,
        publishDate: true,
        updateAt: true,

        author: {
          select: {
            name: true,
            avatarURL: true,
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
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        premiumBlog: true,
        publishDate: true,
        updateAt: true,
        body : true,
        author: {
          select: {
            name: true,
            avatarURL: true,
          },
        },
      },
    });

    return c.json(post);
  } catch (error) {
    console.error(error);
    return c.text("error");
  }
};
