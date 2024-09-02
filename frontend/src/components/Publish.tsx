import { apiWithToken } from "@/config/api";
import { PiPlusBold } from "react-icons/pi";

type Tag = "h1" | "p" | "img" | "code";
type Content = {
  type: Tag
  id: String,
  body: String,
  imgSrc: String
}

import { useState, ReactNode } from "react";
import { Button } from "./ui/button";

export default function Publish() {
  const [elements, setElements] = useState<ReactNode[]>([]);
  const [contents, setContents] = useState<Content[]>([])
  const handleSubmit = async () => {
    const response = await apiWithToken.post("/blog", contents);
    const data = response.data;
    console.log(data);
  };
  const handleAdd = (tag : Tag) => {
    const currId = `${tag}-${elements.length}`;
    console.log(tag)
    const currContent: Content = {
      id: currId,
      type: tag,
      body: "",
      imgSrc : ""
    }
   
    switch (tag) {
      case "h1":
        const heading = <h1 id={currId} className=" outline-none bg-black/5 dark:bg-white/5 py-1 px-2 text-3xl "
          onInput={(e) => {
              currContent.body = e.currentTarget.innerText;
          }}
          contentEditable spellCheck key={elements.length}></h1>;
        setElements([...elements, heading]);
        setContents([...contents, currContent])
        break;
      case "p":
        const paragraph = <p  onInput={(e) => {
          currContent.body = e.currentTarget.innerText;
      }}
          className=" outline-none bg-black/5 dark:bg-white/5  py-1 px-2 "
          contentEditable spellCheck key={elements.length}></p>;
        setElements([...elements, paragraph]);
        setContents([...contents, currContent])
        break;
      case "img":
        // todo
        break;
      case "code":
        const code = <div
        onInput={(e) => {
          currContent.body = e.currentTarget.innerText;
      }}
          className=" outline-none  bg-black/5 dark:bg-white/5  py-1 px-2 "
          
          contentEditable spellCheck key={elements.length}></div >;
        setElements([...elements, code]);
        setContents([...contents, currContent])
        break;
      default:

        break;
    }



  }


  return (
    <div className="mx-10 lg:mx-20">
      <div className="flex  flex-col gap-5">
        {elements}
      </div>
      <ButtonWithMenu handleAdd={handleAdd} />
      <Button onClick={handleSubmit}>Save</Button>
    </div>
  );
}


type ButtonWithMenuProps = {
  handleAdd: (tag: Tag) => void
}

const ButtonWithMenu = ({ handleAdd }: ButtonWithMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
   
  };

  type MenuItem = {
    key : number,
    name : "Heading" | "Paragraph" | "Code" | "Image",
    tag : Tag
  }
  const menuItems : MenuItem [] = [
    {
      key: 1,
      name: "Heading",
      tag : "h1"
    },
    {
      key: 2,
      name: "Paragraph",
      tag : "p"

    },
    {
      key: 3,
      name: "Image",
      tag : "img"
    },
    {
      key: 4,
      name: "Code",
      tag : "code"
    }
  ]



  return (
    <div className="mt-5" >
      <button onClick={toggleMenu} className="hover:rotate-45 duration-100">
        <PiPlusBold />
      </button>
      {isMenuOpen && (
        <ul className="flex flex-col gap-1 w-max p-1">
          {
            menuItems.map(item => <li key={item.key} className=" cursor-pointer  bg-white/10 rounded-sm p-1 " onClick={() => {
              handleAdd(item.tag)
              setIsMenuOpen(false)
            }}>{item.name}</li>)
          }
        </ul>
      )}
    </div>
  );
};


/*

<div>
        <input
          onChange={(e) => {
            setBlog((blog) => ({ ...blog, title: e.target.value }));
          }}
          type="text"
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          placeholder="Title"
        />

        <TextEditor
          onChange={(e) => {
            setBlog((blog) => ({ ...blog, elements: e.target.value }));
          }}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="mt-2">
      <div className="w-full mb-4 ">
        <div className="flex items-center justify-between border">
          <div className="my-2 bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <textarea
              onChange={onChange}
              id="editor"
              rows={8}
              className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
*/