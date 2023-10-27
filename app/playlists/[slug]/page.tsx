"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { fetcher } from "@/library/api";
import { url } from "@/library/api";
import Link from "next/link";
import Layout from "@/components/layout";
import Loading from "@/components/loading";
import { LiaCalendarSolid } from "react-icons/lia";
import { RiArrowGoBackFill } from "react-icons/ri";
import Comments from "@/components/comments";

interface paramDto {
  params: {
    slug: string;
  };
}

export default function Song({ params }: paramDto) {
  const isLogged:any = useSelector<any>((prev) => prev.logged.value);

  const slug = params.slug;
  const [load, setLoad] = useState<boolean>(true);
  const [slugs, setSlugs] = useState<{ data: any } | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetcher(`${url}/the-weekends/${slug}`, {
      method: "Get",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((data) => {
        setSlugs(data);
        setLoad(false);
      })
      .catch((err) => {
        console.error(err);
        setLoad(false);
      });
    }, [slug, token, isLogged]);

    if (!token) {
      redirect('/register');
    }

    if (load) {
      return <Loading />;
    }

  return (
    <Layout>
      <div>
        <div className="relative py-4 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-300 shadow-sm">
          <div className="flex max-w-5xl mx-auto w-11/12 justify-between">
            <div className="flex  gap-4">
              <div className="w-4/12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full"
                  src={slugs?.data?.attributes?.image}
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-between">
                <div className="h-fit">
                  <h1 className="text-5xl font-bold">
                    {slugs?.data?.attributes.single}
                  </h1>
                  <p className="font-thin">
                    From{" "}
                    <span className="font-bold underline">
                      {slugs?.data?.attributes.album}
                    </span>
                  </p>
                  <div className="mt-4 text-[0.5rem]">
                    <p className="text-[0.5rem]">
                      <i>produced by</i> <b>XO(Republic record)</b>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 h-fit">
                  <div className="my-auto">
                    <LiaCalendarSolid />
                  </div>
                  <p className="my-auto font-thin">
                    {slugs?.data?.attributes.releaseDate}
                  </p>
                </div>
              </div>
            </div>
            <Link href="/playlists" className="text-3xl">
              <RiArrowGoBackFill />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <ul className="max-w-5xl mx-auto w-11/12">
          {slugs?.data?.attributes.lyrics
            .split("\n")
            .map((lyric: string, idx: number) => (
              <li
                className={`${
                  lyric.split("")[0] === "[" ? "mt-4 text-gray-600" : "mt-auto"
                }`}
                key={idx}
              >
                {lyric}
              </li>
            ))
          }
          <Comments songID={slugs?.data?.id}/>
        </ul>
      </div>
    </Layout>
  );
}
