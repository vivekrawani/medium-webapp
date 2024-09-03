import { apiWithToken } from "@/config/api";
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils";
import { useState, ReactNode, useRef } from "react";
import { Button } from "./ui/button";
import ButtonWithMenu from "./ui/ButtonWithMenu";

type Tag = "h1" | "p" | "img" | "code";

type Content = {
  type: Tag
  id: String,
  body?: String,

}
export default function Publish() {
  const [elements, setElements] = useState<ReactNode[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await apiWithToken.post("/blog", contents);
    const data = response.data;
    console.log(data);
    setIsLoading(false)
    setContents([])
    setElements([])
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;
    const file = ((files && files?.length > 0) ? files[0] : null) as unknown as File;
    const maxSize = 1 * 1024 * 1024; // 1 MB
    if (file.size > maxSize) {
      alert("Max file size allowed 1 MiB")
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const image = <img src={reader.result} alt="image" key={elements.length} />;
        setElements([...elements, image])
      }
    }

    try {
      setIsLoading(true)
      const url = await fileUpload(file);
      const currContent: Content = {
        id: (contents.length).toString(),
        type: "img",
        body: url
      }
      setContents([...contents, currContent])
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAdd = (tag: Tag) => {
    const currId = `${tag}-${elements.length}`;
    const currContent: Content = {
      id: currId,
      type: tag,
      body: "",
    }
    const rootStyle = "outline-none bg-black/5 dark:bg-white/5 py-1 px-2 rounded-sm";
    switch (tag) {
      case "h1":
        const heading = <h1 id={currId} className={cn(rootStyle, "text-3xl ")}
          onInput={(e) => {
            currContent.body = e.currentTarget.innerText;
          }}
          contentEditable spellCheck key={elements.length}></h1>;
        setElements([...elements, heading]);
        setContents([...contents, currContent])
        break;
      case "p":
        const paragraph = <p onInput={(e) => {
          currContent.body = e.currentTarget.innerText;
        }}
          className={rootStyle}
          contentEditable spellCheck key={elements.length}></p>;
        setElements([...elements, paragraph]);
        setContents([...contents, currContent])
        break;
      case "img":
        // todo
        inputRef.current?.click();

        break;
      case "code":
        const code = <div
          onInput={(e) => {
            currContent.body = e.currentTarget.innerText;
          }}
          className={rootStyle}

          contentEditable spellCheck key={elements.length}></div >;
        setElements([...elements, code]);
        setContents([...contents, currContent])
        break;
      default:

        break;
    }

  }
  return (
    <div className="mx-10 mt-10 lg:mx-20 flex flex-col gap-5">
      <div className="flex  flex-col gap-3">
        {elements}
      </div>
      <ButtonWithMenu handleAdd={handleAdd} />
      <div className="flex justify-end">
      <Button disabled={isLoading}
        onClick={handleSubmit}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Publish
      </Button>
      </div>
     
      <input type="file" accept="image/*" multiple={false} ref={inputRef}
        className="hidden"

        onChange={(event) => { handleFileUpload(event) }}
      />
    </div>
  );
}



async function fileUpload(file: File) {
  const formData = new FormData();
  formData.append('image', file);
  const data = (await apiWithToken.post("/upload", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })).data;
  return data.url;
}

