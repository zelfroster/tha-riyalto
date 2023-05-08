import { useNavigate } from "react-router-dom";

const PostTableRows = ({ postItem, handleDelete, handleEdit }) => {
  const { id, userId, title, body } = postItem;
  const navigate = useNavigate();
  return (
    <tr
      onClick={() => navigate(`/${id}`)}
      className="bg-neutral-50 border border-neutral-200 cursor-pointer text-sm sm:text-base hover:bg-neutral-200"
    >
      <td className="text-center">{id}</td>
      <td className="text-center">{userId}</td>
      <td className="sm:pl-2">{title}</td>
      <td className="sm:px-2">
        <button
          onClick={(e) => handleEdit(e, { id, title, body })}
          className="px-2 py-1 bg-blue-500 text-xs text-white rounded-md sm:text-sm"
        >
          Edit
        </button>
      </td>
      <td className="sm:px-2">
        <button
          onClick={(e) => handleDelete(e, id)}
          className="px-2 py-1 bg-red-500 text-xs text-white rounded-md sm:text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default PostTableRows;
