import Header from "./header"
import Footer from "./footer"

export default function Layout(props: any) {
  return(
    <section className="h-[100vh] flex flex-col justify-between">
      <div>
        <Header />
        {props.children}
      </div>
      <div>
        <Footer/>
      </div>
    </section>
  )
}
