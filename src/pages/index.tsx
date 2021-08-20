import IsAuth from "modules/auth/IsAuth";
import Home from "modules/home/Home";

const HomePage = () => {
  return (
    <IsAuth>
      <Home />
    </IsAuth>
  );
};

export default HomePage;
