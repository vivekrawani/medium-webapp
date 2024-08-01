interface FullblogProps {
  title: string;
  authorName: string;
  publishDate: string;
  content: string;
}
export default function FullBlog({
  title,
  authorName,
  publishDate,
  content,
}: FullblogProps) {
  return (
    <div>
      <div className="grid grid-cols-12 bg-yellow-200">
        <div className="col-span-8 bg-red-200">
          <h2>{title}</h2>
          <div>{authorName}</div>
          <div>{publishDate}</div>
          <div>{content} </div>
        </div>
        <div className="col-span-4 bg-gray-200"> Right</div>
      </div>
    </div>
  );
}
