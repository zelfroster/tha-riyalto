const PostTableLayout = ({ children }) => {
  return (
    <table className="my-4 border-collapse mx-auto overflow-x-scroll">
      <thead>
        <tr className="bg-neutral-200/80 border border-neutral-200 py-2 text-sm sm:text-base">
          <th className="sm:px-2 py-1">PostID</th>
          <th className="sm:px-2 py-1">UserID</th>
          <th className="sm:px-2 py-1">Post Title</th>
          <th className="sm:px-2 py-1">Edit</th>
          <th className="sm:px-2 py-1">Delete</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default PostTableLayout;
