
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { fetchBlogById } from "@/lib/features/blogs";
import { Skeleton } from "@/components/ui/skeleton";


export default function SingleBlog() {
  const { id = "" } = useParams();
  const { loading, blog } = useAppSelector((state) => state.blog);
  const content = parseBody(blog?.body)
  const dispatch = useAppDispatch();
  console.log(blog)
  useEffect(() => {
    dispatch(fetchBlogById(id))
  }, [])
  if (loading === "pending") {
    return <BlogSkleton />
  }
  return (
    <div className="mx-10 md:mx-20 my-5 flex flex-col gap-2">
      {content}
    </div>
  );
}

function BlogSkleton() {
  return (<div className=" mx-10 my-3 md:mx-20 flex flex-col gap-3">
    <Skeleton className="h-[80px] w-full rounded-xl" />
    <Skeleton className="h-[300px] w-full " />
    <div className="flex flex-row gap-3">
      <Skeleton className="h-[90px] w-[100px] rounded-full" />
      <Skeleton className="h-[100px] w-full rounded-xl" />
    </div>

    <Skeleton className="h-[100px] w-full " />

  </div>)
}



const Heading = ({ content, key }: { content: string, key: number }) => {
  return (
    <h1 className="font-bold text-5xl" key={key}>
      {content}
    </h1>
  )
}

const Paragraph = ({ content, key }: { content: string, key: number }) => {
  return (
    <p className=" text-xl" key={key}>
      {content}
    </p>
  )
}

const CodeElement =  ({ content, key }: { content: string, key: number }) => {
  return (
    <code className=" text-xl" key={key}>
      {content}
    </code>
  )
}


function parseBody(body: string[] | undefined) {
  if (body) {
    const x = body.map((item, index) => {
      const pivot = item.indexOf(" ")
      const tag = item.slice(0, pivot);
      const c = item.slice(pivot)
      switch (tag) {
        case "h1":
          return <Heading key={index} content={c}/>
        case "p":
          return <Paragraph key={index} content={c}/>
          

          break;
        case "code":
          return <CodeElement key={index} content={c}/>
        case "img":
          const img = <img src={c} alt="alt" key={index} />
          return img;

        default:
          break;
      }

    })
    return x;
  }
}
