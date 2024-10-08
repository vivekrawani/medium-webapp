import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn, setLocalStorage } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import { SignInInput } from "@vivek_kr/medium-common";
import { useDispatch } from "react-redux";
import { updateUser } from "@/lib/features/user";
import { Loader2 } from "lucide-react";

const appName = "Medium";
export function SigninForm() {
  const [userInfo, setUserInfo] = useState<SignInInput>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const { jwt, user } = (await api.post("/signin", userInfo)).data;
    setIsLoading(false);
    dispatch(updateUser(user));
    setLocalStorage("medium-jwt-token", jwt);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  const navigate = useNavigate();
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to {appName}
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="jhondoe@gmail.com"
            type="email"
            value={userInfo.email}
            onChange={(e) => {
              setUserInfo((info) => ({ ...info, email: e.target.value }));
            }}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            onChange={(e) => {
              setUserInfo((info) => ({ ...info, password: e.target.value }));
            }}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit" disabled={isLoading}
          >
            {isLoading ?  <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : <>Sign up &rarr;</> }
         
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
      <p className="font-thin">
        Don't have an account? &nbsp;
        <span
          className="underline cursor-pointer"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Create a new account.
        </span>
      </p>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
