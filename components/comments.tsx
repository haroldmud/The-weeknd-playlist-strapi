import { useEffect, useState, useRef } from "react";
import { fetcher } from "@/library/api";
import { VscKebabVertical } from "react-icons/vsc";
import { CiFlag1 } from "react-icons/ci";
import { PiTrashThin } from "react-icons/pi";
import { url } from "@/library/api";
import Delete from "./delete";

export default function Comments(props: any) {
  const colors = [
    "bg-gray-800",
    "bg-rose-800",
    "bg-green-800",
    "bg-cyan-800",
    "bg-indigo-800",
    "bg-teal-800"
  ];
  const [comments, setComments] = useState<any>([]);
  const [admin, setAdmin] = useState<any>("");
  const [userComment, setUserComment] = useState<any>("");
  function handleComment(event: any) {
    setUserComment(event.target.value);
  }
  const token = localStorage.getItem("token");

  useEffect(() => {
    try {
      fetcher(`${url}/comments`).then((data) =>
        setComments(
          data?.data.filter(
            (item: any) => item.attributes.songID === props.songID
          )
        )
      );
    } catch (err) {
      console.error(err);
    }
  }, [props.songID]);

  useEffect(() => {
    fetcher(`${url}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((data) => setAdmin(data.username))
      .catch((err) => console.error(err));
  }, [admin, token]);

  async function submitComment(e: Event) {
    e.preventDefault();
    setComments([{attributes: {
      username: admin,
      comment: userComment,
      songID: props.songID}
    },...comments])
    try {
      const response = await fetcher(`${url}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          data: {
            username: admin,
            comment: userComment,
            songID: props.songID
          }
        })
      });
      return response;
    } catch (err) {
      console.error("An unexpected error occured", err);
    }
  }

  async function clear(){
    await setUserComment('');
  }

  const [openItems, setOpenItems] = useState<boolean[]>(Array(comments?.length).fill(false));

  function handleDetail(idx: number) {
    const newOpenItems = [...openItems];
    newOpenItems[idx] = !newOpenItems[idx];
    setOpenItems(newOpenItems);
  }

  const [deleteId, setDeleteId] = useState<null | number>(null);
  const [popUp, setPopup] = useState<boolean>(false);
  const popupRef: any = useRef(null);
  function deleting(id: number){
    setDeleteId(id);
  }
  function canceling(){
    setDeleteId(null);
    setPopup(false)
  }
  const closePopup = () => {
    setPopup(false);
  };
  useEffect(() => {
    if (popUp) {
      const handleOutsideClick = (e: any) => {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
          console.log("Clicked outside of pop-up");
          closePopup();
        }
      };
  
      document.addEventListener('mousedown', handleOutsideClick);
  
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [popUp]);
  const handleDeletion = async() => { 
    await fetcher(`${url}/comments/${deleteId}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((data) => setComments(comments.filter(
        (item: any) => item.id !== data.id
      )))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form
        onSubmit={(e: any) => { submitComment(e); clear() }}
        action="submit"
        className="mt-8"
      >
        <div className="flex">
          <div>
            <span className="rounded-[50%] px-3 font-bold py-3 text-[0.6rem] bg-white mr-2">
              {admin.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="w-full">
            <div>
              <input
                type="text"
                onChange={handleComment}
                value={userComment}
                className="outline-none border-b w-8/12 border-black placeholder:italic placeholder:text-black pl-1 placeholder:text-xs bg-transparent"
                placeholder="write your comment"
              />
            </div>
          </div>
        </div>
        <div className="w-8/12 ml-4 flex justify-end mt-2">
         {userComment ? <button disabled={!userComment} className="text-sm bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 px-4 font-semibold shadow-sm rounded-md hover:bg-blue-900 text-blue-100 p-1">
            Add your comment
          </button> 
          :
          <div className="text-sm cursor-not-allowed px-4 font-semibold shadow-sm rounded-md register text-blue-200 p-1">
            Add your comment
          </div> 
          }
        </div>
      </form>
      <div className="grid gap-4 mt-8 ">
        {comments?.map((item: any, key: number) => (
          <div className="group relative flex justify-between w-9/12" key={key}>
            <div className="flex gap-1">
              <div className="my-auto">
                <span
                  className={`rounded-[50%] px-3 font-bold py-3 text-white text-[0.6rem] ${
                    colors[Math.floor(Math.random() * 6)]
                  } mr-2`}
                >
                  {item.attributes.username.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="italic text-xs">@{item.attributes.username}</p>
                <p className="text-xs">{item.attributes.comment}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center ">
              <button onClick={()=> handleDetail(key)} className={`${openItems[key] ? '' : "group-hover:block hidden"} `}><VscKebabVertical /></button>
            </div>
            {
              openItems[key]
              &&
              <div ref={popupRef} className="absolute -right-20 grid gap-1">
                {admin === item.attributes.username &&
                  <button onClick={()=> { deleting(item.id); setPopup(true)}} className="register rounded-sm font-thin hover:bg-gray-300 text-[0.5rem] p-2 flex justify-between gap-2 my-auto">Supprimer <span className="my-auto text-xs"><PiTrashThin/></span></button>
                }
                <button className="register rounded-sm font-thin hover:bg-gray-300 text-[0.5rem] p-2 flex justify-between gap-2 my-auto">signaler <span className="my-auto text-xs"><CiFlag1 /></span></button>
              </div>
            }
          </div>
        ))}
      </div>
      {
        popUp &&
        <Delete 
        cancel={()=>canceling()} 
        delete={()=>{handleDeletion();canceling()}}
        />
      }
      
    </div>
  );
}
