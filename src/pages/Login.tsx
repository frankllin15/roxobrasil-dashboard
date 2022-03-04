import DefaultButton from "@/components/DefatultButton";
import { SpinnerLoading } from "@/components/icons";
import { useAuth } from "@/context/AuthContex/AuthProvider";
import { IError } from "@/lib/graphql";
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
  const [loading, setLoading] = useState(false);
  const [isValid, setIsvalid] = useState(true);
  // const [requestErrors, setRequestErrors] = useState<IError[]>([]);

  // console.log(requestErrors);
  useEffect(() => {
    if (session?.token) navigate("/dashboard");
  }, [session]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const { success, errors } = await login(form);
    setLoading(false);
    // console.log(success, errors);

    if (!success) setIsvalid(false);
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
            type="email"
            title="Email"
            required={true}
            value={form?.email}
            className="my-2"
            onFocus={() => setIsvalid(true)}
            style={{ width: "300px" }}
          />
          <InputText
            name="password"
            onChange={handleChange}
            type="password"
            title="Senha"
            required={true}
            value={form?.password}
            className="my-2"
            onFocus={() => setIsvalid(true)}
          />

          <div className="flex flex-row justify-between items-center">
            {loading ? (
              <SpinnerLoading />
            ) : (
              <DefaultButton
                type="submit"
                className="bg-black text-neutral-100"
              >
                Entrar
              </DefaultButton>
            )}

            {!isValid && (
              <p className="text-red-500 font-semibold">
                Email ou senha inválidos!
              </p>
            )}
          </div>
        </form>
      </div>
    );
  return null;
};
