"use client"
import Layout from "@/components/layout";
import { useSelector } from "react-redux";

export default function Register() {
  const login = useSelector<any>(state => state.logged.value);
  console.log(login)
  return (
    <>
      <Layout >
      <section>
        <div className="header">
          <h3 className="mx-auto w-fit font-thin text-xs py-1">
            Quick Secure Sign Up
          </h3>
        </div>
        <div className="shadow-lg w-7/12 flex justify-center p-12 register mx-auto mt-32">
          <form className="grid gap-4" action="submit">
            <div className="flex gap-4">
              <p className="w-24">UserName</p>
              <input className="pl-2 placeholder:text-[12px] w-11/12 text-[12px] py-1 bg-transparent header border border-gray-500 outline-1 outline-blue-900 rounded-sm"
                type="text"
                placeholder="enter the usename of your choice"
              />
            </div>
            <div className="flex gap-4">
              <p className="w-24">Email</p>
              <input className="pl-2 placeholder:text-[12px] w-11/12 text-[12px] py-1 bg-transparent header border border-gray-500 outline-1 outline-blue-900 rounded-sm" type="email" placeholder="enter your email" />
            </div>
            <div className="flex gap-4">
              <p className="w-24">Password</p>
              <input className="pl-2 placeholder:text-[12px] w-11/12 text-[12px] py-1 bg-transparent header border border-gray-500 outline-1 outline-blue-900 rounded-sm" type="password" placeholder="enter your password" />
            </div>
            <div className="flex gap-4">
              <p className="w-24">Confirm</p>
              <input className="pl-2 placeholder:text-[12px] w-11/12 text-[12px] py-1 bg-transparent header border border-gray-500 outline-1 outline-blue-900 rounded-sm" type="password" placeholder="confirm your password" />
            </div>
            <div className="flex">
              <p>
                By clicking &apos;Great, Register My Account&apos; you agree to
                the{" "}
                <a href="#" className="inline underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a className="inline underline" href="#">
                  Privacy and Cookie Policy
                </a>
                .
              </p>
              <button type="submit" className="text-sm bg-blue-700 px-20 font-semibold shadow-sm rounded-md hover:bg-blue-900 text-white">Great, Register my account</button>
            </div>
          </form>
        </div>
      </section>
      </Layout>
    </>
  );
}
