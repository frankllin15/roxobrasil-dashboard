import DefaultButton from "@/components/DefatultButton";
import { useAuth } from "@/context/AuthContex/AuthProvider";
import { LOGIN_MUTATION } from "@/lib/graphql/mutation";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "../components/InputText";
import { useApollo } from "../lib/apolloClient";

interface IForm {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [form, setForm] = useState<IForm>({ email: "", password: "" });
  const navigate = useNavigate();
  const { session, login } = useAuth();

  console.log(session);
  useEffect(() => {
    if (session?.token) navigate("/dashboard");
  }, [session]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { success } = await login(form);

    // console.log(success, errors);

    console.log(success, session);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (session?.token == null)
    return (
      <div className="w-full h-screen flex flex-col items-center justify-evenly">
        <h1 className="text-4xl font-semibold">Roxobrasil Dashboard</h1>
        <form onSubmit={handleSubmit} className="bg-neutral-200 rounded-md p-4">
          <InputText
            name="email"
            onChange={handleChange}
            title="Email"
            required={true}
            value={form?.email}
            className="my-2"
          />
          <InputText
            name="password"
            onChange={handleChange}
            title="Senha"
            required={true}
            value={form?.password}
            className="my-2"
          />

          <DefaultButton type="submit" className="bg-black text-neutral-100">
            Entrar
          </DefaultButton>
        </form>
      </div>
    );
  return null;
};
