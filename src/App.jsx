import { Routes, Route } from "react-router-dom";

import HomeLayout from "./components/HomeLayout";
import Posts from "./routes/Posts";
import Post from "./routes/Post";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Posts />} />
        <Route path="/:id" element={<Post />} />
      </Route>
    </Routes>
  );
};

export default App;
