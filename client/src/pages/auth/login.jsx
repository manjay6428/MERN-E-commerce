import CommonForm from "@/components/common/form";
import { loginFields } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      console.log(data);

      if (data?.payload?.success) {
        toast(data?.payload?.message);
      } else {
        toast.error(data?.payload?.message);
      }
    });
  };
  return (
    <div className=" mx-auto w-full max-w-md space-y-6">
      <div className=" text-center">
        <h1 className=" text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className=" mt-2">
          Don&apos;t have an account
          <Link
            className=" font-medium ml-2 text-primary hover:underline"
            to={"/auth/register"}
          >
            SignUp
          </Link>
        </p>
      </div>
      <CommonForm
        formData={formData}
        setFormData={setFormData}
        formControls={loginFields}
        onSubmit={onSubmit}
        buttonText={"Sign In"}
      />
    </div>
  );
};

export default Login;
