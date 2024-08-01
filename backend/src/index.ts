import { Context, Hono } from 'hono'
import { verify } from 'hono/jwt';
import { createBlog, getBlogs, signIn, signUp, updateBlog, getBlog} from './controllers';
import { cors } from 'hono/cors';
import { uploadContent } from './controllers/upload';

interface  Enviroment  {
  Bindings : {
    DATABASE_URL : string,
    JWT_SECRET : string,
    MY_BUCKET: R2Bucket
  }
  Variables : {
    userId: string
  }
}

const api_v1 = new Hono<Enviroment>().basePath('/api/v1');

api_v1.get('/', (c)=>{
 
  return c.text("hi there server is running")
})

api_v1.use(cors())

api_v1.use('/blog/*', async(c, next)=>{
  const {JWT_SECRET} = c.env;
  const authorization = c.req.header('Authorization') || "";

  if (!authorization) {
    c.status(401);
		return c.json({ error: "Unauthorized" });
  }
  const token = authorization.split(' ')[1];
  try {
    const payload = await verify(token,JWT_SECRET );
    if (!payload) {
      c.status(401);
      return c.json({ error: "Unauthorized" });
    }
    // const user   = payload;
    const userId = payload.id as string;
    console.log("id", userId)
    c.set('userId', userId);
    await next()
  } catch (error) {
    console.error(error)
    c.status(401)
    return c.json({ error: "Unauthorized" });
  }
 
})

api_v1.post('/signup', signUp)
api_v1.post('/signin', signIn)
api_v1.get('/blog', getBlogs)
api_v1.post('/blog', createBlog)
api_v1.put('/blog', updateBlog)
api_v1.get('/blog/:id', getBlog)
api_v1.post('/upload', uploadContent)



export default api_v1;
