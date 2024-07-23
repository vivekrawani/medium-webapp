import { Context } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/jwt"
export const signUp = async(c : Context)=>{

    const {DATABASE_URL, JWT_SECRET} = c.env;
    const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate())

//   const body =  await c.req.parseBody();
  const body =  await c.req.json();
    try {
      const user =  await prisma.user.create({
        data : {
            name : body.name,
            email : body.email,
            password : body.password
        }
        })
        const jwt = await sign({
            id : user.id,
            name : user.name,
        }, JWT_SECRET)
      
        return c.json({jwt});
    } catch (error) {
        c.status(400)
        console.error(error)
        return c.json({message : "Email already exists"})
    }

    
}

export const signIn = async (c : Context)=>{
    const {DATABASE_URL, JWT_SECRET} = c.env;
    const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate())
  const body =  await c.req.json();
    try {
      const user =  await prisma.user.findUnique({
        where: {
			email: body.email
		}
        })
        if(!user) {
            c.status(400)
            return c.json({message : "User not found"})
        }
        const jwt = await sign({
            id : user.id,
            name : user.name,
        }, JWT_SECRET)
        return c.json({jwt});
    } catch (error) {
        return c.status(400)
    }
}