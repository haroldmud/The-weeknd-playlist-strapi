"use client"
import { useEffect, useState } from "react"
import { fetcher } from "@/library/api";
import Layout from "@/components/layout";
import Loading from "@/components/loading";
import { LiaCalendarSolid } from 'react-icons/lia'

interface paramDto {
  params: {
    slug: string
  }
}

export default function Song({params} :paramDto) {
  const slug = params.slug;
  const [load, setLoad] = useState<boolean>(true);
  const [slugs, setSlugs] =  useState<{ data: any } | null>(null);
  useEffect(()=> {
    fetcher(`http://localhost:1337/api/the-weekends/${slug}`)
      .then(data => {setSlugs(data); setLoad(false)})
      .catch(err => {console.log(err); setLoad(false)});
  }, [slug])
  if(load){
    return(
      <Loading />
    )
  }
  return(
    <Layout>
      <div>  
        <div className="relative py-4 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-300 shadow-sm">
          <div className="flex gap-4 max-w-5xl mx-auto w-11/12">
            <div className="w-4/12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full" src={slugs?.data.attributes.image} alt="" />
            </div>
            <div className="flex flex-col justify-between">
              <div className="h-fit">
                <h1 className="text-5xl font-bold">{slugs?.data.attributes.single}</h1>
                <p className="font-thin">From <span className="font-bold underline">{slugs?.data.attributes.album}</span></p>
                <div className="mt-4">
                  <p className="text-[0.5rem]">produced by</p>
                  <p>XO(Republic record)</p>
                </div>
              </div>
              <div className="flex gap-2 h-fit">
                <div className="my-auto">
                  <LiaCalendarSolid />
                </div>
                <p className="my-auto">{slugs?.data.attributes.releaseDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ul className="max-w-5xl mx-auto w-11/12">
          {
            slugs?.data.attributes.lyrics.split('\n').map((lyric: string, idx: number)=> 
              <li className={`${lyric.split("")[0] === '[' ? 'mt-4 text-gray-600' : 'mt-auto'}`} key={idx}>{lyric}</li>
            )
          }
        </ul>
      </div>
    </Layout>
  )
}
