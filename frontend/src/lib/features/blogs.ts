// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(false);
// const [blogs, setBlogs] = useState<Blog[]>([]);

// apiWithToken
//     .get("/blog")
//     .then((response) => {
//         console.log(response.data);
//         setBlogs(response.data);
//         setLoading(false);
//     })
//     .catch(() => {
//         // console.error(err);
//         setLoading(false);
//         setError(true);
//     });
import { apiWithToken } from "@/config/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { Blog, Blog2 } from "../types";

type InitialState = {
    blogs: Blog2[];
    blog: Blog | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
}
const initialState: InitialState = {
    blogs: [],
    blog: null,
    loading: "idle",
};

const fetchBlogById = createAsyncThunk(
    'api/v1/blog/id',
    async (id: string, thunkAPI) => {

        try {
            const response = await apiWithToken.get(`/blog/${id}`);
            return response.data;
        } catch (error) {
            thunkAPI.rejectWithValue("error")
        }

    },
)


export const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBlogById.fulfilled, (state, action)=>{
            state.blog = action.payload;
            state.loading = "succeeded"
        }),
        
        builder.addCase(fetchBlogById.pending, (state)=>{
            state.loading = "pending";
        }),

        builder.addCase(fetchBlogById.rejected, (state)=>{
            state.loading = "failed";
        })

    }
})

export const {  } = blogSlice.actions;
export {fetchBlogById};
export default blogSlice.reducer;

