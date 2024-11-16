/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { uploadFiles } from "../../api/uploadFiles";
import useEcomStore from "../../store/ecom-store";
import { removeFiles } from "../../api/removeFiles"
import { Loader } from "lucide-react";

const Uploadfile = ({form, setForm}) => {

  const token = useEcomStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);

  
  const handleOnChange = (e) => {
    setIsLoading(true)
    const files = e.target.files;
    
    if (files) {
      let allFiles = form.Images;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
 
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} Not Image`)
          continue
        }

        // resize
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          ["JPEG","PNG","WEBP"],
          100,
          0,
          (data) => {
            //  endpoint backend
            uploadFiles(token, data)
            .then((res) => {
              // console.log("res=> ",res);
              allFiles.push(res.data.result)
              setForm({...form, Images: allFiles})
              setIsLoading(false)
              toast.success("Upload image success");
              }
            )
            .catch((err) => {
              setIsLoading(false);
              console.log("err=> ",err)
              }
            )

          },
          "base64"
        );
      }
    }
  }
 
  const handleDelete = (public_id) => {
    const images = form.Images;

    removeFiles(token, public_id)
    .then((res) => {
        const filterImages = images.filter((item) => {
          return item.public_id !== public_id;
        })
        console.log(filterImages)
        setForm({...form, Images: filterImages});
        toast.success(res.data.message);
      }
    )
    .catch((err) => console.log(err))

  }

  return (
    <div className="my-4">

      <div className="flex mx-4 gap-4 my-4">

        {
          isLoading && <Loader className="animate-spin w-16 h-16"/>
        }

        {
          form.Images.map((item, index) => 
            <div key={index} className="relative">
              <img 
                className="w-24 h-24 hover:scale-105"
                src={item.url} 
              />
              <span 
                onClick={() => handleDelete(item.public_id)}
                className="absolute top-0 right-0 bg-red-600 px-2 rounded-full cursor-pointer"
                >
                  X
              </span>
            </div>

          )
        }
      </div>

      <div>
        <input 
          type="file"
          name="Images"
          multiple
          onChange={handleOnChange}
        />
      </div>

    </div>
  )}

export default Uploadfile