import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Comment from "../components/Comment";
import { Link } from "react-router-dom";

const Post = () => {
  const [postData, setPostData] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function LoadPostData() {
      const postDataRes = await fetch(
        `https://jsonplaceholder.typicode.com/posts${location.pathname}`,
      ).then((res) => res.json());
      const postCommentRes = await fetch(
        `https://jsonplaceholder.typicode.com/posts${location.pathname}/comments`,
      ).then((res) => res.json());

      setPostData(postDataRes);
      setPostComments(postCommentRes);
    }
    LoadPostData();
  }, []);

  return (
    <section className="max-w-5xl px-2 mx-auto">
      <Link to={"/"} className="font-bold text-blue-700">
        &lt;- Back
      </Link>
      <article
        id="post"
        className="px-4 pt-8 pb-6 mt-2 bg-neutral-50 border border-neutral-200 rounded-md sm:p-8"
      >
        <div
          id="postHeading"
          className="flex flex-col-reverse justify-between items-center gap-4 w-full sm:flex-row"
        >
          <h2 className="text-xl text-center capitalize font-bold sm:pl-2 sm:text-4xl sm:text-left">
            {postData.title}
          </h2>
          <p className="w-16 h-16 aspect-square rounded-full bg-neutral-300 text-sm text-neutral-700 font-bold grid place-items-center">
            User{postData.userId}
          </p>
        </div>
        <p className="mt-4 text-sm sm:text-base sm:pl-3 sm:mr-16 sm:mt-6">
          {postData.body}
        </p>
      </article>
      <h3 className="text-lg font-bold mt-4 sm:text-xl">Comments</h3>
      <div
        id="comments"
        className="mt-2 flex flex-col gap-2 text-xs sm:text-base"
      >
        {postComments &&
          postComments.map((comment) => (
            <Comment key={comment.id} commentDetails={comment} />
          ))}
      </div>
    </section>
  );
};

export default Post;
