import AuthBalls from "../components/AuthBalls";
import AuthInfo from "../components/AuthInfo";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <AuthBalls />
      <div className="flex md:flex-row flex-col items-center justify-center md:gap-24 gap-4  px-8 py-16  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100/30">
        <AuthInfo />
        <h1 className={`md:hidden text-cursive text-4xl text-emerald-500`}>
          SocioLite
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
