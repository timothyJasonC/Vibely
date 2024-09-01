import Image from "next/image";

const Home = () => {
  return (
    <>
      <div className="flex flex-wrap relative">
        <div className="Cover ">
          <Image
            width={535}
            height={145}
            alt="Pemandangan"
            src="/cover.jpg"
            className="absolute"
          />
          <div className="profile">
            <Image
              src="/blankPicture.png"
              alt="Empty profile pict"
              width={500}
              height={500}
              className="bg-white rounded-[100%] h-[139px] w-[139px] absolute -bottom-[180px] ml-9"
            />
          </div>

          <div className="relative ml-[200px] -bottom-[160px]">
            <p className="font-semibold text-[30px]">Nama Anda</p>
            <p className="">Meow Engineer</p>
          </div>
        </div>
      </div>
      <div className="flex items-center relative gap-16 bg-[#E0F4FF] -bottom-[200px] px-10 rounded-lg w-[370px] m-auto">
        <div className="text-center">
          <p className="text-black font-bold text-2xl">205</p>
          <p className="text-gray-600">Image</p>
        </div>
        <div className="text-center">
          <p className="text-black font-bold text-2xl">205</p>
          <p className="text-gray-600">Video</p>
        </div>
        <div className="text-center">
          <p className="text-black font-bold text-2xl">205</p>
          <p className="text-gray-600">Blog</p>
        </div>
      </div>
    </>
  );
};

export default Home;
