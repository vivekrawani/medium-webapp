import { Context } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


export const createPost = async(c : Context)=>{
      const body =  await c.req.json();
      const authorId = c.get('userId')
      const {DATABASE_URL, JWT_SECRET} = c.env;
      const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate())   
  
  try {
    const post = await prisma.post.create({
        data : {
            title : body.title as string,
            content : body.content as string,
            authorId : authorId as string
        }
    })
    return c.json(post);
  } catch (error) {
    console.error(error)
    return c.text("error")
  }
 
 }
 


 export const updatePost = async (c : Context)=>{
    const body =  await c.req.json();
    const authorId = c.get('userId')
    const {DATABASE_URL, JWT_SECRET} = c.env;
    const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
}).$extends(withAccelerate())   
    try {
        const post = await prisma.post.update({
            where : {
                id : body.id
            },
            data : {
                title : body.title as string,
                content : body.content as string,
                authorId : authorId as string
            }
        })
        return c.json(post);
      } catch (error) {
        console.error(error)
       return c.text("error")
      }
}

export const getBlogs = async (c : Context)=>{
    const {DATABASE_URL, JWT_SECRET} = c.env;
    const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
}).$extends(withAccelerate()) 
try {
    const posts = await prisma.post.findMany({});
       
    return c.json(posts);
  } catch (error) {
    console.error(error)
   return c.text("error")
  }
}

export const getBlog= async(c : Context)=>{
    const params = c.req.param();  
    console.log(params)
     const {DATABASE_URL, JWT_SECRET} = c.env;
     const prisma = new PrismaClient({
     datasourceUrl: DATABASE_URL,
 }).$extends(withAccelerate()) 
 try {
     const post = await prisma.post.findUnique({
        where : {
            id : params.id
        }
     });
        
     return c.json(post);
   } catch (error) {
     console.error(error)
    return c.text("error")
   }
 }