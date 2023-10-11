"use client"
import Header from "@/components/header"
import { useState, useEffect } from "react"
import {fetcher} from '../../library/api';

export default function Playlist() {
  const [songs, setSongs] = useState(null);
  useEffect(()=>{
    fetcher(`http://localhost:1337/api/the-weekends`)
      .then(data => setSongs(data))
      .catch(err =>{
        console.error(err)
      })
  }, [])
  return(
    <>
      <Header />
      <div>
        {JSON.stringify(songs)}
      </div>
    </>
  )
}
