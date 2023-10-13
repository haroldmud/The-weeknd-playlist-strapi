import Layout from "./layout"

export default function Loading(){
  return(
    <Layout>
      <div className='py-72'>
        <span className="relative flex h-10 w-10 flex-col justify-center mx-auto">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500 mx-auto"></span>
      </span>
      </div>
    </Layout>
  )
}
