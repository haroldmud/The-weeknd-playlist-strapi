import { withRouter } from "next/router";
import { Link } from "react-router-dom";

export function ActiveLink({router, href, className, children}: any) {
  (function (){
    if(typeof window !== 'undefined') {
      router.prefetch(router.pathname)
    }
  })()

  function handleClick(event: Event) {
    event.preventDefault();
    router.push(href)
  }

  const isCurrentPath = router?.pathname === href || router?.aspath === href;

  return(
    <Link href={href} className={`${isCurrentPath && 'underline'} ${className}`} onClick={handleClick}>
      {children}
    </Link>
  )
}


export default withRouter(ActiveLink);
