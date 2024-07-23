import z from "zod";
const signUpInput = z.object({
    email : z.string().email(),
    password : z.string().min(6, "password is not strong"),
    name :  z.string().optional()
});
type SignUpInput = z.infer<typeof signUpInput>;

const signInInput = z.object({
    email : z.string().email(),
    password : z.string().min(6, "invalid password"),
    
});

type SignInInput = z.infer<typeof signInInput>;

export {signInInput, signUpInput, SignInInput, SignUpInput};
