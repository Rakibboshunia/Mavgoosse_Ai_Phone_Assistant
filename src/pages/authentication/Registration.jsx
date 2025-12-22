import { useForm } from "react-hook-form";
import AuthContainer from "../../components/AuthContainer";
import FormInput from "../../components/FormInput";

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <AuthContainer>
      <div className="bg-linear-to-tr from-[#00B8DB33] to-[#00B8DB33] rounded-2xl px-8 pt-8 pb-28">
        <div>
          <div className="flex items-center justify-center ">
            <img className="w-20" src="/logo.png"></img>
          </div>

          <div className="text-center space-y-1.5 py-9">
            <h4 className="text-2xl font-semibold">AI Call Admin</h4>
            <p className="text-xl text-[#99A1AF]">Sign in to manage your dashboard</p>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <input {...register("firstName")} />
            <FormInput/>
            <input {...register("age", { pattern: /\d+/ })} />
            {errors.age && <p>Please enter number for age.</p>}
            <input type="submit" />
          </form>
        </div>
      </div>
    </AuthContainer>
  );
}
