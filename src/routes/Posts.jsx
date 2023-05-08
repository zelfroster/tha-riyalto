import { useState, useEffect } from "react";
import { useMemo } from "react";
import Form from "../components/Form";
import PostTableRows from "../components/PostTableRows";
import PostTableLayout from "../components/PostTableLayout";

const defaultFormData = {
  title: "",
  body: "",
  userId: 0,
};

const Posts = () => {
  const [postList, setPostList] = useState([]);
  const [createFormData, setCreateFormData] = useState(defaultFormData);
  const [editFormData, setEditFormData] = useState(defaultFormData);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [deleteItemArr, setDeleteItemArr] = useState([]);

  useEffect(() => {
    async function LoadPosts() {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      ).then((res) => res.json());
      setPostList(res);
    }
    LoadPosts();
  }, []);

  // get all userId in an Array
  let userIdArr = [...new Set(postList.map((item) => item.userId))];

  // heavy calculation to filter out posts
  const filteredPostList = useMemo(() => {
    return postList.filter((item) => !deleteItemArr.includes(item.id));
  }, [postList, deleteItemArr]);

  const handleChange = (e, formData, setFormData) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create New Post
  const handleCreateFormSubmit = async (e, formData, setFormData) => {
    e.preventDefault();
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: formData.title,
        body: formData.body,
        userId: parseInt(formData.userId),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json());
    setPostList([...postList, res]);
    setFormData(defaultFormData);
  };

  // Edit A Post
  const handleEditFormSubmit = async (e, formData) => {
    e.preventDefault();
    // get the post to be patched
    const postToBeEdited = filteredPostList.filter(
      (item) => item.id === formData.id,
    )[0];
    // set new properties from user to be patched
    let postPropertiesToBeEdited = {
      ...(postToBeEdited.title !== formData.title
        ? { title: formData.title }
        : {}),
      ...(postToBeEdited.body !== formData.body ? { body: formData.body } : {}),
    };
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${formData.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(postPropertiesToBeEdited),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    ).then((res) => res.json());
    setPostList((postList) =>
      postList.map((item) => (item.id === res.id ? res : item)),
    );
  };

  // Edit A Post
  const handleEdit = async (e, { id, title, body }) => {
    e.stopPropagation();
    setIsEditPopupOpen(true);
    setEditFormData({
      ...editFormData,
      ["id"]: id,
      ["title"]: title,
      ["body"]: body,
    });
  };

  // Delete A Post
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    setDeleteItemArr([...deleteItemArr, id]);
  };

  return (
    <section className="max-w-5xl mx-auto flex flex-col items-center p-2">
      <h2 className="text-xl text-center font-bold">All Posts</h2>
      <button
        onClick={() => setIsCreatePopupOpen(true)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm sm:text-base"
      >
        Create New Post
      </button>

      <div
        id="createFormPopup"
        className={`${
          isCreatePopupOpen ? "flex" : "hidden"
        } fixed top-0 left-0 w-full min-h-screen bg-neutral-800/40 grid place-items-center`}
      >
        <Form
          formData={createFormData}
          setFormData={setCreateFormData}
          setIsPopupOpen={setIsCreatePopupOpen}
          handleChange={handleChange}
          handleFormSubmit={handleCreateFormSubmit}
          userIdArr={userIdArr}
        />
      </div>
      <PostTableLayout>
        {filteredPostList ? (
          filteredPostList.map((item) => (
            <PostTableRows
              key={item.id}
              postItem={item}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <tr>Loading Table Data</tr>
        )}
      </PostTableLayout>

      <div
        id="editFormPopup"
        className={`${
          isEditPopupOpen ? "flex" : "hidden"
        } fixed top-0 left-0 w-full min-h-screen bg-neutral-800/40 grid place-items-center`}
      >
        <Form
          formData={editFormData}
          setFormData={setEditFormData}
          setIsPopupOpen={setIsEditPopupOpen}
          handleChange={handleChange}
          handleFormSubmit={handleEditFormSubmit}
          userIdArr={userIdArr}
          isCreateForm={false}
        />
      </div>
    </section>
  );
};

export default Posts;
