import api from "../../config/api";
import { useState, ChangeEvent } from "react";
export default function Publish() {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });
  const handleSubmit = async () => {
    console.log("Begin");
    const response = await api.post("/blog", blog, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("medium-jwt-token")}`,
      },
    });
    const data = response.data;
    console.log(data);
  };

  return (
    <div>
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
            setBlog((blog) => ({ ...blog, content: e.target.value }));
          }}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

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
