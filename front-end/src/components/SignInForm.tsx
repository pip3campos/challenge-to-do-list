'use client'

import { signIn } from "../app/api"
import { FormEventHandler, useState } from "react"

export default function SignInForm () {
    const [emailValue, setEmailValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");

    const handleSubmitUser: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const user = await signIn({
        email: emailValue,
        password: passwordValue
    })
    setEmailValue("")
    setPasswordValue("")
    }
  return (
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
            Sign up
        </button>
        </div>
    </form>
  )
}

