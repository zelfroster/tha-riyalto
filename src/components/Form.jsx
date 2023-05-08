const Form = ({
  formData,
  setFormData,
  setIsPopupOpen,
  handleChange,
  handleFormSubmit,
  userIdArr,
  isCreateForm = true,
}) => {
  return (
    <form
      action=""
      className="relative px-8 py-6 height h-max flex flex-col bg-neutral-100 border border-neutral-200 rounded-md sm:px-14 sm:py-10"
      onSubmit={(e) => handleFormSubmit(e, formData, setFormData)}
    >
      <h3 className="text-2xl font-bold text-center mb-4">
        {isCreateForm ? "New Post" : "Edit Post"}
      </h3>
      <label htmlFor="userId">
        Select {isCreateForm ? "UserId" : "PostId"}
      </label>
      <select
        type="number"
        id="userId"
        name="userId"
        value={isCreateForm ? formData.userId : formData.id}
        onChange={(e) => handleChange(e, formData, setFormData)}
        className={`mb-4 mt-0.5 px-3 py-1.5 w-64 rounded-md sm:w-96 ${
          isCreateForm ? "bg-white" : ""
        }`}
        disabled={!isCreateForm}
      >
        {userIdArr.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <label htmlFor="title">Enter Post Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={(e) => handleChange(e, formData, setFormData)}
        className="mb-4 mt-0.5 px-2 py-1 w-64 rounded-md sm:w-96"
      />
      <label htmlFor="body">Enter Post Details</label>
      <textarea
        id="body"
        name="body"
        rows={4}
        value={formData.body}
        onChange={(e) => handleChange(e, formData, setFormData)}
        className="mb-8 mt-0.5 px-2 py-1 w-64 rounded-md sm:w-96"
      />
      {/* Button to submit the form */}
      <button
        onClick={() => setIsPopupOpen(false)}
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        {isCreateForm ? "Create Post" : "Confirm Edit"}
      </button>

      {/* Button to close the popup */}
      <button
        onClick={() => setIsPopupOpen(false)}
        type="button"
        className="absolute -top-3 -right-3 w-8 h-8 aspect-square bg-blue-600 font-bold text-xs text-white rounded-full"
      >
        X
      </button>
    </form>
  );
};

export default Form;
