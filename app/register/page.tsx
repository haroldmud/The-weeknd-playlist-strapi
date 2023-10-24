"use client"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { url } from "@/library/api";
import Layout from "@/components/layout";
import { setToken } from "@/library/auth";
import { login } from "../_Redux/Features/loggedSlice";
import { useEffect } from "react";

export default function Register() {
  const regex = /^.{6}$/;
  const signupDispatch = useDispatch();
  const [passwordCheck, setPasswordCheck] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [error, setError] = useState(false)
  const [sign, setSign] =  useState({
    username: '',
    email: '',
    trialpass: '',
    password:''
  });
  useEffect(()=>{
    if(passwordCheck || passwordValid || error){
      setTimeout(() => {
        setPasswordValid(false);
        setPasswordCheck(false);
        setError(false)
      }, 3000);
    }
  },[passwordCheck, passwordValid, error]);
  const logged: any = useSelector<any>((state) => state.logged.value);

  const handleRegistration = async(e: Event) => {
    e.preventDefault();
    if(sign.trialpass !== sign.password) {
      setPasswordCheck(true)
    }else if(!regex.test(sign.password)){
      setPasswordValid(true)
    }else if(sign.trialpass === sign.password && regex.test(sign.password)){
      setPasswordCheck(false)
      setPasswordValid(false)
      try{
        const response = await fetch(`${url}/auth/local/register`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: sign.username,
            email: sign.email,
            password: sign.password,
          })
        });
        if(response.status === 200) {
          const result = await response.json();
          setToken(result);
          signupDispatch(login(true))
          localStorage.setItem('isLogged', logged)
        } else if (response.status === 400) {
          setError(true);
        }
      }catch(error){
        console.error('an Error occured during registration', error)
      }
    }
  }
  const token = localStorage.getItem('token')
  function redirecter() {
    if(token) {
      window.location.href = '/';
    }
  }
  if(token){
    window.location.href = '/';
  }else {
    return (
      <>
        <Layout >
        <section>
          <div className="header">
            <h3 className="mx-auto w-fit font-bold text-violet-500 text-xs py-1">
              Quick Secure Sign Up to get full access
            </h3>
          </div>
          <div className="shadow-lg w-7/12 flex justify-center p-12 register mx-auto mt-32">
            <form onSubmit={(event: any) => {handleRegistration(event), redirecter()}} className="grid gap-4" action="submit">
              <div className="flex gap-4">
                <p className="w-24">UserName</p>
                <input className="pl-2 placeholder:text-[12px] w-11/12 text-[12px] py-1 bg-transparent header border border-gray-500 outline-1 outline-blue-900 rounded-sm"
                  type="text"
                  onChange={(e)=> {setSign({...sign, username: e.target.value})}}
                  placeholder="enter the usename of your choice"
                />
              </div>
              <div className="flex gap-4">
                <p className="w-24">Email</p>
                <input onChange={(e)=> {setSign({...sign, email: e.target.value})}} className="pl-2 placeholder:text-[12px] w-11/12 text-[12px] py-1 bg-transparent header border border-gray-500 outline-1 outline-blue-900 rounded-sm" type="email" placeholder="enter your email" />
              </div>
              <div className="flex gap-4">
                <p className="w-24">Password</p>
                <input onChange={(e)=> {setSign({...sign, trialpass: e.target.value})}} className={`pl-2 placeholder:text-[12px] w-11/12 text-[12px] py-1 bg-transparent header border ${passwordCheck || passwordValid?'border-red-500':'border-gray-500'} outline-1 outline-blue-900 rounded-sm`} type="password" placeholder="enter your password" />
              </div>
              <div className="flex gap-4">
                <p className="w-24">Confirm</p>
                  <input onChange={(e)=> {setSign({...sign, password: e.target.value})}} className={`pl-2 placeholder:text-[12px] w-11/12 text-[12px] py-1 bg-transparent header border ${passwordCheck || passwordValid?'border-red-500':'border-gray-500'} outline-1 outline-blue-900 rounded-sm" type="password" placeholder="confirm your password`} type="password" placeholder="confirm password" />
                  
              </div>
              {passwordCheck && <p className="text-red-500 text-center">your passwords did not match</p>}
              {passwordValid && <p className="text-red-500 text-center">your password should have atleast 6 characters</p>}
              {error && <p className="text-red-500 text-center">User already exists or other error occurred</p>}
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
}
