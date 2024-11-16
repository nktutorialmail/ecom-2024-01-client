import { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categorys = useEcomStore((state) => state.categorys);

  const [text, setText] = useState("");
  const [categorySelected, setCatgorySelected] = useState([]);
  const [price, setPrice] = useState([1000,30000]);
  const [ok, setOk] = useState(false);
  
  // Step 1 Search by text
  useEffect(() => {
    const delay = setTimeout(() => {
      
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [actionSearchFilters, getProduct, text]);
  

  // Step 2 Search by Catagory
  useEffect(() => {
    getCategory();
  }, [])

  const handleCheck = (e) => {
    const inCheck = e.target.value;
    const inState = [...categorySelected];  
    const findCheck =inState.indexOf(inCheck) //if not found return -1

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1)  // ลบ ไฟล์ 
    }

    setCatgorySelected(inState);

    if(inState.length >  0) {
      actionSearchFilters({ category: inState })
    } else {
      getProduct();
    }
  }

 // Step 3 Search by price
useEffect(() => {
  actionSearchFilters({ price })
}, [actionSearchFilters, ok, price]);

const handlePrice = (value) => {
  setPrice(value);
  setTimeout(() => {
    setOk(!ok)
  }, 300)
}


  return (
    <div>
      <h1 className="text-xl font-bold mb-4">ค้นหาสินค้า</h1>
      <input 
        type="text"
        placeholder="ค้นหาสินค้า"
        className="border rounded-md w-full mb-4 px-2"
        onChange={(e) => setText(e.target.value)}
      />
      <hr />

      <div>
        <h1>หมวดหมู่สินค้า</h1>
        <div>
          {
            categorys.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input type="checkbox" value={item.id} onChange={handleCheck}/>
                <label htmlFor="">{item.name}</label>
              </div>
            ))
          }
        </div>

      </div>
      <hr />

      <div>
        <h1>ค้นหาราคา</h1>
        <div>

          <div className="flex justify-between">
            <span>Min: {price[0]}</span>
            <span>Mix: {price[1]}</span>
          </div>

          <Slider 
            onChange={handlePrice}
            range
            min={0}
            max={100000}
            defaultValue={[1000,30000]}
          />
        </div>
      </div>


    </div>
  )
}

export default SearchCard