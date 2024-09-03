import { Context } from "hono";

export const uploadContent = async (c: Context) => {
  const body = await c.req.parseBody();
  const image = body.image as unknown as File;
  const fileName = image.name;
  const lastModified  = image.lastModified;
  const key = `${fileName.slice(0, 10)}-${lastModified}`;
  const resp = await c.env.MY_BUCKET.put(key, image);
  console.log(resp)
  const url = `${c.env.R2_BUCKET_URL}/${key}`
  return c.json({ message: `Put successfully!`, url});
};
