import IsNotAuth from "modules/auth/IsNotAuth";
import Login from "modules/user/login/Login";

const LoginPage = () => {
  return (
    <IsNotAuth>
      <Login />
    </IsNotAuth>
  );
};

export default LoginPage;
