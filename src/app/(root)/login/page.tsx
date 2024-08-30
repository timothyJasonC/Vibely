import Image from "next/image"
import Link from "next/link"

function page() {
    return (
        <section className="h-full flex relative">
            <div className="absolute">
                <div className="w-[400px] h-28 bg-main"></div>
                <Image src={'/waves-header.svg'} alt="waves-header" width={800} height={100} className="absolute top-8 z-10" />
            </div>

            <main className="flex flex-col gap-2 pt-32 items-center mx-auto">
                <div className="flex gap-1 items-center mx-auto">
                    <Image src={'/favicon.ico'} alt="waves-top" width={40} height={40} />
                    <h1 className="tracking-widest font-extrabold text-3xl">IBELY</h1>
                </div>

                <h1 className="text-2xl font-semibold">Login</h1>

                <form action="" className="flex flex-col w-[250px] gap-2">
                    <input type="text" placeholder="Masukkan Email" className="bg-main placeholder:text-black p-2 text-xs rounded-md" />
                    <input type="password" placeholder="Masukkan Password" className="bg-main placeholder:text-black p-2 text-xs rounded-md" />
                    <button type="submit" className="bg-primary-100 text-white font-bold text-xl rounded-md">LOGIN</button>
                </form>

                <div className="relative">
                    <div className="w-[250px] bg-gray-300 h-[1px] absolute top-[15px] z-0 -left-[125px]"></div>
                    <h1 className="font-thin bg-white absolute -left-[14px] p-1">OR</h1>
                </div>

                <button className=" border-2 border-primary-100 w-full font-bold text-xl rounded-md mt-8">GOOGLE</button>

                <div className="text-[8px] flex gap-2 mt-2">
                    <p className="font-thin">Forgot Password?</p>
                    <div className="w-[1px] bg-gray-300 h-[12px]"></div>
                    
                    <p className="font-thin">Need New Account? <Link rel="stylesheet" className="font-medium" href={'/register'} >Signup !</Link></p>
                </div>

            </main>

            <div className="absolute bottom-0">
                <div className="w-[400px] h-32 bg-main"></div>
                <Image src={'/waves-top.svg'} alt="waves-top" width={800} height={100} className="absolute -top-24 z-10" />
                <Image src={'/waves-top.svg'} alt="waves-top" width={800} height={100} className="absolute rotate-180 -top-8 z-10" />
            </div>

        </section>
    )
}

export default page
