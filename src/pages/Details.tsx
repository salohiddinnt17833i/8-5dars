import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { RxExit } from "react-icons/rx";


interface PhoneType {
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  category_id: string;
  createdAt: string;
  updatedAt: string;
}
function Details() {
  let [phone, setPhone] = useState<PhoneType>();
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (params.id) {
      fetch(`https://auth-rg69.onrender.com/api/products/${params.id}`).then(
        (res) =>
          res
            .json()
            .then((data) => {
              setPhone(data);
            })
            .catch((err) => {
              console.log(err);
            })
      );
    } else {
      navigate("/");
    }
  }, []);
  console.log(phone);

  return (
    <>
      <Link to='/' className='relative left-[50px] top-[20px] shadow-lg px-6 py-2 rounded-lg font-bold flex  items-center gap-2 w-40 justify-center'>Back <RxExit /></Link>
      <div className="w-[300px] px-12 py-8 shadow-lg mx-auto mt-20 text-[#F2B225] flex justify-center">
        {phone ? (
          <div>
            <h2 className="text-black font-bold"><span className="text-amber-500  ">Name:</span> {phone.name}</h2>
            <h3 className="text-black font-bold"><span className="text-amber-500	">Description:</span> {phone.description}</h3>
            <h3 className="text-black font-bold"><span className="text-amber-500	">Price:</span> ${phone.price}</h3>
            <h3 className="text-black font-bold"><span className="text-amber-500	">Status:</span>  {phone.status}</h3>
            <h3 className="text-black font-bold"><span className="text-amber-500	">Cotegory ID:</span>  {phone.category_id}</h3>
            <h3 className="text-black font-bold"><span className="text-amber-500	">Created AT:</span>  {phone.createdAt}</h3>
            <h3 className="text-black font-bold"><span className="text-amber-500	">Update AT:</span> {phone.updatedAt}</h3>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div></>
  );
}

export default Details;
