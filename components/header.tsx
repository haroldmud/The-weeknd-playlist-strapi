import Link from "next/link";

export default function Header() {
  return(
    <header className="header py-4 shadow-lg">
      <div className="flex justify-between w-10/12 mx-auto">
        <Link className="flex" href={'/'}>
          <h2 className="font-bold text-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">XO</h2>
          <p className="text-[8px] text-gray-700">Til we overdose</p>
        </Link>
        <div className="flex gap-4 text-gray-500">
          <Link className="my-auto font-bold hover:text-blue-500" href={'/'}>
            <h2>Home</h2>
          </Link>
          <Link className="my-auto font-bold hover:text-blue-500" href={'/playlist'}>
            <h2>Playlist</h2>
          </Link>
          <form className="flex gap-2">
            <input className="pl-2 placeholder:text-[12px] text-[12px] py-1 bg-transparent header border border-gray-500 outline-1 rounded-sm" required type="text" placeholder="Username" />
            <input className="pl-2 placeholder:text-[12px] text-[12px] py-1 bg-transparent header border border-gray-500 outline-1 rounded-sm" required type="password" name="pass" id="pass" placeholder="Password" />
            <button type="submit" className="text-sm bg-blue-700 px-4 font-semibold shadow-sm rounded-md hover:bg-blue-900 text-white">Login</button>
          </form>
          <Link className="my-auto font-bold hover:text-blue-500" href={'/register'}>
            <h2>Register</h2>
          </Link>
        </div>
      </div>
    </header>
  )
}