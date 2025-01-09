export default function Card({bg, img, height}) {

  return(
    <div className={`flex justify-center items-center w-80 h-80 ${bg} rounded-xl shadow-lg cursor-pointer transform transition-all duration-200 hover:scale-105 px-5`}>
      <img src={img} alt="logo-card"/>
    </div>
  )
}