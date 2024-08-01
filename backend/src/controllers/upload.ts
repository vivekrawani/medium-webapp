import { Context } from "hono";

export const uploadContent = async (c: Context) => {
  const body = await c.req.parseBody();
  const url = new URL(c.req.url);
  const key = "somerandomtext";
  const image = body.image;
  console.log(image);
  const r = await c.env.MY_BUCKET.put(key, image);
  console.log(r);
  return c.text(`Put ${key} successfully!`);
};
