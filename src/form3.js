import { useForm } from "react-hook-form";
export default function Form3() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Your Name</label>
      <input type="name" {...register("name", { required: true })} />
      {errors.email && <p>Email is required and must be valid</p>}
      <label>Password</label>
      <input type="password" {...register("password", { required: true })} />
      {errors.password && <p>Password is required</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
