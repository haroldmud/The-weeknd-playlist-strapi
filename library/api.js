export const url = process.env.NEXT_PUBLIC_STRAPI_URL;

export const colors = [
  "bg-gray-800",
  "bg-rose-800",
  "bg-green-800",
  "bg-cyan-800",
  "bg-indigo-800",
  "bg-teal-800"
];

export async function fetcher(url, options=  {}) {
  let response;
  if(!options) {
    response = await fetch(url);
  }else {
    response = await fetch(url, options);
  }
  const data = await response.json();
  return data;
}
