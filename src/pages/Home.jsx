import BestSeller from "../components/home/BestSeller";
import ContentCarousel from "../components/home/ContentCarousel";
import NewProduct from "../components/home/NewProduct";

const Home = () => {
  return (
    <div>
      <ContentCarousel />

      <p className="text-2xl text-center my-4">สินค้าขายดี</p>
      <BestSeller />

      <p className="text-2xl text-center my-4">สินค้ามาใหม่</p>
      <NewProduct />
    </div>
  )
}

export default Home