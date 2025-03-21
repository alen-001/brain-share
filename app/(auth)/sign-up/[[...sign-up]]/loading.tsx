import Image from 'next/image'

const Loader = () => {
  return (
    <main className=' w-screen h-screen flex justify-center items-center bg-[#1e1b22]'>
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#f9f9f9]">
            <Image src='/assets/brainshare.svg' alt="Brain Share" width={100} height={100} className="brightness-200 invert" />
        </div>
    </main>
  )
}

export default Loader
