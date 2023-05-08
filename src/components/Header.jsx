import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="text-center py-4">
      <Link to="/" className="text-2xl font-black">
        Share Thoughts
      </Link>
    </header>
  );
};

export default Header;
