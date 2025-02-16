'use client'

import { signIn } from "../api";
import { FormEventHandler, useState } from "react";
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const router = useRouter();

  const handleSubmitUser: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (emailValue.trim() === "" || passwordValue.trim() === "") {
      return;
    }
    const user = await signIn({
      email: emailValue,
      password: passwordValue
    })
    if (user) {
      router.push('/todo-list');
    } else {
      alert('Sign-in failed, please try again!');
    }
    setEmailValue("")
    setPasswordValue("")
  }
  return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmitUser}>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    value={emailValue}
                    onChange={e => setEmailValue(e.target.value)}
                    placeholder="Enter email address"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    value={passwordValue}
                    onChange={e => setPasswordValue(e.target.value)}
                    placeholder="Enter password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}