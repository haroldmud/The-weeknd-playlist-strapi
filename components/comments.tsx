import { useEffect, useState } from "react";
import { fetcher } from "@/library/api";
import { url } from "@/library/api";
import jwtDecode from "jwt-decode";

export default function Comments(props: any) {
  const [comments, setComments] = useState<any>([]);
  const [admin, setAdmin] = useState<any>('');
  const colors = ['gray', 'rose', 'green', 'cyan', 'indigo', 'teal'];
  useEffect(()=>{
    try{
      fetcher(`${url}/comments`)
      .then((data)=> setComments(data?.data.filter((item: any) => 
      item.id === props.songID
      )));
    }catch(err) {
      console.error(err);
    } 
  }, [props.songID])
  console.log(props.songID)
  useEffect(()=>{
      const token = localStorage.getItem('token');
      if(token) {
        const decodedjwt: any = jwtDecode(token);
        const username = decodedjwt.username;
        setAdmin(username);
      }
    },[])
    console.log(admin)
  return(
    <div >
      <form action="submit" className="mt-8">
        <div className="flex">
          <div>
            <span className="rounded-[50%] px-3 font-bold py-3 text-[0.6rem] bg-white mr-2">US</span>{admin}
          </div>
          <div className="w-full">
            <div>
              <input type="text" className="outline-none border-b w-8/12 border-black placeholder:italic placeholder:text-black pl-1 placeholder:text-xs bg-transparent" placeholder="write your comment"/>
            </div>
          </div>
        </div>
        <div className="w-8/12 ml-4 flex justify-end mt-2">
          <button  className="text-sm bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 px-4 font-semibold shadow-sm rounded-md hover:bg-blue-900 text-blue-100 p-1">Add your comment</button>
        </div>
      </form>
      <div className="grid gap-4 mt-8">
        {
          comments.map((item: any, key: number) => 
            <div className="flex gap-1" key={key}>
              <div className="my-auto">
                <span className={`rounded-[50%] px-3 font-bold py-3 text-white text-[0.6rem]  bg-${colors[Math.floor(Math.random()*6)]}-800 mr-2`}>{item.attributes.username.slice(0,2).toUpperCase()}</span>
              </div>
              <div>
                <p className="italic text-xs">@{item.attributes.username}</p>
                <p className="text-xs">{item.attributes.comment}</p>
              </div>
            </div>
          )
        }
      </div>
      </div>
  )
}
