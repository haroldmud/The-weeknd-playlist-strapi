"use client";
import Layout from "@/components/layout";
import { useState, useEffect } from "react";
import { fetcher } from "../../library/api";
import Link from "next/link";
import Loading from "@/components/loading";

export default function Playlist() {
  const [songs, setSongs] = useState<{
    data: any;
  } | null>(null);
  const [load, setLoad] = useState<boolean>(true);
  useEffect(() => {
    fetcher(`http://localhost:1337/api/the-weekends`)
      .then((data) => {setSongs(data); setLoad(false)})
      .catch((err) => {
        console.error(err);
        setLoad(false);
      });
  }, []);

  if(load){
    return(
      <Loading />
    )
  }

  return (
    <>
      <Layout >
      <div className="mx-auto max-w-5xl">
        <h1 className="font-bold text-2xl mt-12 mb-6">
          PLAYLIST AVAILABLE LYRICS
        </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mx-auto">
          {songs &&
            songs.data.map((song: any) => (
              <div className="shadow-lg register p-2 rounded-lg" key={song.id}>
                <div className="flex gap-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-20 h-20"
                    src={song.attributes.image}
                    alt="song image"
                  />
                  <div className="flex flex-col justify-between py-3">
                    <h2 className="font-bold">{song.attributes.single}</h2>
                    <Link
                      href={`/playlists/${song.id}`}
                      className="px-6 ml-12 text-xs hover:text-smß py-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-300 shadow-sm rounded-md hover:bg-blue-900 text-blue-100 w-20"
                    >
                      Read
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      </Layout >
    </>
  );
}
