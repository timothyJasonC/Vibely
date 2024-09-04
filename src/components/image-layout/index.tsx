import { imageList } from "@/lib/data"; 

export default function ImageLayout() {
  return (
    <div className="image-gallery mt-10 mx-4 grid grid-cols-12 gap-4">
      {imageList.map((image, index:any) => (
        <div
          key={index}
          className={`rounded-2xl bg-gray-300 overflow-hidden
             ${index % 6 === 0 ? 'h-48' : ''} 
             ${index % 6 === 1 ? 'h-80' : ''} 
             ${index % 6 === 2 ? 'h-56' : ''} 
             ${index % 6 === 3 ? 'h-52' : ''} 
             ${index % 6 === 4 ? 'h-24' : ''} 
             ${index % 6 === 5 ? 'h-24' : ''}`
            }
          style={{
            gridColumn: getColumnSpan(index % 6),
            gridRow: getRowSpan(index % 6),
          }}
        >
          <img
            src={image.image}
            alt={`image-${index}`}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
}

function getColumnSpan(index:any) {
  switch (index) {
    case 0:
    case 2:
    case 3:
      return "span 6"; 
    case 4:
    case 1:
      return "span 6"; 
    case 5:
      return "span 12"
    default:
      return "span 12"; 
  }
}

function getRowSpan(index:any) {
  switch (index) {
    case 0:
      return "span 2"; 
    case 1:
      return "span 3"; 
    case 2:
      return "span 2";
    case 3:
      return "span 2";
    case 4:
      return "span 1"; 
    case 5:
      return "span 2"; 
    default:
      return "span 3"; 
  }
}

