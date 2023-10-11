import Header from "@/components/header"
import Link from "next/link"
export default function Home() {
  return (
    <>
      <Header />
      <div>
        <div className="register w-5/12 mx-auto p-8 mt-32 rounded-lg">
          <p className="font-bold text-3xl">
            THE WEEKND&apos;S <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">BEST MUSIC LYRICS</span>
          </p>
          <p className="pt-8 pb-6">This is a sample website created by <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">harold Mudosa</span> for <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Strapi and nextJS practice</span>.</p>
          <Link href={'/playlist'} type="submit" className="text-sm bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 px-4 font-semibold shadow-sm rounded-md hover:bg-blue-900 text-blue-100 p-2">Find your Fav Song</Link>
        </div>
      </div>
    </>
  )
}
