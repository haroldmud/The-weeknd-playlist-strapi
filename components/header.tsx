"use client";
import { login, logout } from "@/app/_Redux/Features/loggedSlice";
import { useEffect, useState } from "react";
import Link from "next/link";
import { url } from "@/library/api";
import { useDispatch, useSelector } from "react-redux";
import { setToken, unsetToken } from "../library/auth";
import { useRouter } from "next/navigation";
import Logout from "./logout"

export default function Header() {
  const loginDispatch = useDispatch();
  const [show, setShow] = useState(null);
  const [popup, setPopup] = useState(false);
  const router = useRouter();
  const [log, setLog] = useState({
    identifier: "",
    password: ""
  });
  const logged: any = useSelector<any>((state) => state.logged.value);

  const handleChange = (e: any) => {
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: Event) => {
    // if(typeof loggedLS==='string'){
      event.preventDefault();
      localStorage.setItem("isLogged", logged);
      try {
        loginDispatch(login(true));
        const response = await fetch(`${url}/auth/local`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            identifier: log.identifier, //can either be an email or a username
            password: log.password
          })
        });
        const result = await response.json();
        setToken(result);
        console.log(result.jwt, 'check out bruv')
        setShow(result.jwt);
      }catch (err) {
        console.error(err);
      }
  };
  useEffect(()=>{
    setTimeout(() => {
      if(show===undefined){
        setShow(null)
      }
    }, 3000);
  },[show])
  //Redux login and logout state management for other pages accessibility
  const loggedLS = localStorage.getItem("isLogged");
  const token = localStorage.getItem('token')
  console.log(token)
  function handleLogout() {
    if(typeof loggedLS === null){
      console.log('loggedLS')
    }
    console.log('first')
    unsetToken();
    if(token){
      setShow(null);
    }
    loginDispatch(logout(false));
    localStorage.removeItem("isLogged");
    setPopup(false);
    router.refresh(); //reload the page to clean
  }
  function handleCancel() {
    setPopup(false);
  }
  return (
    <header className="header py-4 shadow-lg">
      <div className="flex justify-between w-10/12 mx-auto">
        <Link className="flex" href={"/"}>
          <h2 className="font-bold text-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            XO
          </h2>
          <p className="text-[8px] text-gray-700">Til we overdose</p>
        </Link>
        {show===undefined && <p className="text-red-500">wrong credentials</p>}
        <div className="flex gap-4 text-gray-500">
          <Link className="my-auto font-bold hover:text-blue-500" href={"/"}>
            <h2>Home</h2>
          </Link>
          <Link
            className="my-auto font-bold hover:text-blue-500"
            href={"/playlists"}
          >
            <h2>Playlist</h2>
          </Link>
          { !token? (
            <form
              onSubmit={(event: any) => handleSubmit(event)}
              className="flex gap-2"
            >
              <input
                className={`pl-2 placeholder:text-[12px] text-[12px] py-1 bg-transparent header border ${show===undefined ? 'border-red-500' :'border-gray-500'} outline-1 rounded-sm`}
                required
                type="text"
                name="identifier"
                onChange={handleChange}
                placeholder="username"
              />
              <input
                className={`pl-2 placeholder:text-[12px] text-[12px] py-1 bg-transparent header border ${show===undefined ? 'border-red-500' :'border-gray-500'} outline-1 rounded-sm`}
                required
                type="password"
                name="password"
                id="pass"
                onChange={handleChange}
                placeholder="Password"
              />
              <button
                type="submit"
                className="text-sm bg-blue-700 px-4 font-semibold shadow-sm rounded-md hover:bg-blue-900 text-white"
              >
                Login
              </button>
            </form>
          ) : (
            <Link
              className="my-auto font-bold hover:text-blue-500"
              href={"/register-"}
            >
              <h2>Profile</h2>
            </Link>
          )}
          {token ? (
            <button
              onClick={()=> setPopup(true)}
              className="my-auto font-bold hover:text-blue-500"
            >
              <h2>Logout</h2>
            </button>
          ) : (
            <Link
              className="my-auto font-bold hover:text-blue-500"
              href={"/register"}
            >
              <h2>Register</h2>
            </Link>
          )}
        </div>
      </div>
      <Logout poping={popup} logout={handleLogout} cancel={handleCancel}/>
    </header>
  );
}
