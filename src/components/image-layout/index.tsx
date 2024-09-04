export default function ImageLayout() {
    return (
        <div className="image-gallery mt-10 mx-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
                <img src="" alt="image" className="h-36 object-cover rounded-2xl bg-gray-300" />
                <img src="" alt="image" className="h-44 object-cover rounded-2xl bg-gray-300" />
                <img src="" alt="image" className="h-28 object-cover rounded-2xl bg-gray-300" />
            </div>
            <div className="flex flex-col gap-4">
                <img src="" alt="image" className="h-[17rem] object-cover rounded-2xl bg-gray-300" />
                <img src="" alt="image" className="h-44 object-cover rounded-2xl bg-gray-300" />
            </div>
            <div className="col-span-2">
                <img src="" alt="image" className="w-full h-28 object-cover rounded-2xl bg-gray-300" />
            </div>
        </div>
    )
}