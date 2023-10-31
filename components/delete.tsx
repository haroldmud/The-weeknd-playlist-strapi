export default function Delete(props: any) {
  return(
    <>
      <div className={`popup flex fixed border left-0 flex-col justify-center top-0 w-full h-[100vh] z-20`}>
        <div className="w-4/12 bg-blue-300 rounded-lg mx-auto  p-4 py-12">
          <p className="text-center">Delete comment?</p>
          <div className="flex justify-center mt-4 gap-8">
            <button onClick={props.cancel} className="w-32 bg-blue-900 rounded-lg font-bold text-white">NO</button>
            <button onClick={props.delete}  className="w-32 bg-red-900 rounded-lg font-bold text-white">YES</button>
          </div>
        </div>
      </div>
    </>
  )
}