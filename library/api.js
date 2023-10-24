export const url = process.env.NEXT_PUBLIC_STRAPI_URL;

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
