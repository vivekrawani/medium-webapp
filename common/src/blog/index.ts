import z from "zod";

const createBlogInput = z.object({
    title : z.string(),
    content : z.string()
});

type CreateBlogInput = z.infer<typeof createBlogInput>;


const updateBlogInput = z.object({
    title : z.string(),
    content : z.string(),
    id : z.string()
});

type UpdateBlogInput = z.infer<typeof updateBlogInput>;

export {createBlogInput, CreateBlogInput, updateBlogInput, UpdateBlogInput};
