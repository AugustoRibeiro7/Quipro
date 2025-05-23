"use client";

import { ArrowLeft, EnvelopeSimple, LockSimple } from "phosphor-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { ErrorMessage } from "../components/ErrorMessage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita o reload da página

    // Requisição para o back-end
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Envia o email e a senha ao backend
      });

      if (response.ok) {
        // Sucesso no login
        const {token, userId, userName, lastChapterAccessedId} = await response.json();

        
        // Armazene o idUser em um cookie
        setCookie(null, 'idUser', userId, {
          maxAge: 60 * 60, // 1 hora
          path: '/', // Disponível em todo o site
          sameSite: 'lax',
          secure: false, //process.env.NODE_ENV === 'production', // Apenas habilita o secure em produção
        });

        // Armazene o token em um cookie
        setCookie(null, 'authToken', token, {
          maxAge: 60 * 60, // 1 hora
          path: '/', // Disponível em todo o site
          sameSite: 'lax',
          secure: false, //process.env.NODE_ENV === 'production', // Apenas habilita o secure em produção
        });

        // Armazene o username em um cookie
        setCookie(null, 'userName', userName, {
          maxAge: 60 * 60, // 1 hora
          path: '/', // Disponível em todo o site
          sameSite: 'lax',
          secure: false, //process.env.NODE_ENV === 'production', // Apenas habilita o secure em produção
        });

        // Armazene o id do ultimo capitulo acessado pelo usuario em um cookie
        setCookie(null, 'lastChapterAcessedId', lastChapterAccessedId, {
          maxAge: 60 * 60, // 1 hora
          path: '/', // Disponível em todo o site
          sameSite: 'lax',
          secure: false, // process.env.NODE_ENV === 'production', // Apenas habilita o secure em produção
        });

        // Redirecionar para home page
        router.push("/home");
      } else {
        // Exibir mensagem de erro
        setErrorMessage("Email ou Senha incorretos!");
      }

    } catch (error) {
      setErrorMessage("Falha ao fazer login. Tente novamente: "+error);
      console.error("Erro: ", error);
    }
  };

  return (
    <div className="bg-zinc-900 h-screen w-full flex flex-col justify-between items-center">
      <div className="flex flex-col items-center justify-center flex-grow gap-y-10 px-2 sm:px-0">
        <Image alt="logo" src={"/logo.svg"} width="200" height="64" />
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="border-red-500 w-full sm:w-[500px] flex flex-col gap-5">
            <div className="relative group w-full">
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={50}
                placeholder="Informe seu e-mail"
                className="text-gray-500 w-full h-12 font-roboto bg-zinc-900 border-zinc-700 text-xl p-4 pl-14 pr-4 border-solid border rounded-full focus:outline-none focus:border-violet-600"
              />
              <EnvelopeSimple
                size={24}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-lime-400"
              />
            </div>

            <div className="relative group w-full">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={40}
                placeholder="Digite sua senha"
                className="text-gray-500 w-full h-12 font-roboto bg-zinc-900 border-zinc-700 text-xl p-4 pl-14 pr-4 border-solid border rounded-full focus:outline-none focus:border-violet-600"
              />
              <LockSimple
                size={24}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-lime-400"
              />
            </div>
          </div>
          {errorMessage && (
            <ErrorMessage message={errorMessage} />
          )}
          <div className=" w-full sm:w-[500px] flex flex-col gap-4">
            <button
              type="button"
              className="sm:ml-auto text-violet-600 text-sm tracking-wide"
            >
              Esqueceu sua senha?
            </button>
            <div className="flex w-full flex-wrap justify-center gap-4 text-xl sm:text-base">
              <Link href={'../'}>
                <button
                  type="button"
                  className="flex items-center justify-center gap-1 w-64 sm:w-[15.0625rem] h-[3rem] border border-lime-400 px-4 py-[0.625rem] text-white rounded-full hover:border-lime-300 transition-colors duration-200"
                >
                  <ArrowLeft size={24} />
                  Voltar
                </button>
              </Link>
              <button
                type="submit"
                className=" w-64 sm:w-[15.0625rem] h-[3rem] bg-violet-600 px-4 py-[0.625rem] text-white font-bold rounded-full hover:bg-violet-500 transition-colors duration-200"
              >
                Entrar
              </button>
            </div>
          </div>
        </form>
      </div>
      <Link href="/signup" className="text-sm text-zinc-400 group mb-16">
        Ainda não tem uma conta? Entre aqui e{" "}
        <span className="text-violet-600 underline group-hover:text-violet-500">
          cadastre-se
        </span>
      </Link>
    </div>
  );
}
