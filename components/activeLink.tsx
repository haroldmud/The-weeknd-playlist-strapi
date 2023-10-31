import { useRouter } from "next/router";
import Link from "next/link";

export function ActiveLink({router, href, className, children}: any) {
  const routing = useRouter();
  // (function (){
  //   if(typeof window !== 'undefined') {
  //     router.prefetch(router.pathname)
  //   }
  // })()

  function handleClick(event: any) {
    event.preventDefault();
    router.push(href)
  }

  const isCurrentPath = routing?.pathname === href;

  return(
    <Link href={href} className={`${isCurrentPath && 'underline'} ${className}`} onClick={handleClick}>
      {children}
    </Link>
  )
}
