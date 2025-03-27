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
      <input
        type="text"
        {...register("name", { required: "Name is required" })}
      />
      {errors.name && <p>{errors.name.message}</p>}

      <label>Password</label>
      <input
        type="password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
