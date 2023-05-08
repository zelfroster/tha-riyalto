const Comment = ({ commentDetails }) => {
  const { email, name, body } = commentDetails;
  return (
    <div className="px-4 py-5 flex flex-col gap-1 bg-neutral-100 rounded-md sm:p-4 hover:bg-neutral-200">
      <div id="userDetails" className="flex flex-col">
        <h3 className="text-lg font-bold capitalize leading-6">{name}</h3>
        <p className="text-xs mb-1">{email}</p>
      </div>
      <p>{body}</p>
    </div>
  );
};

export default Comment;
