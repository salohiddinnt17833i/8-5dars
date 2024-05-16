import { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface CardType {
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    status: string;
    category_id: string;
    createdAt: string;
    updatedAt: string;
  };
  deletItem: (arg: string) => void;
  beingDeleted: {
    id?: string;
    beingDelete?: boolean;
  };
}
const Card: FC<CardType> = (props) => {
  const navigate = useNavigate();
  function handelDelet() {
    let isDelit = confirm("Are you want to delete?");
    if (isDelit) {
      props.deletItem(props.data.id);
    }
  }
  function handelDetails() {
    navigate(`details/${props.data.id}`);
  }

  return (
    <div
      className="shadow-xl w-[200px] p-4 rounded-lg bg-white cursor-pointer border-2 border-[#EFEFEF] text-[#8F95A0] transition duration-300 hover:scale-[1.02]"

    >
      <h3 className="text-[12px] font-bold text-black"><span className="font-extrabold">Name:</span><span className="text-red-600"> {props.data.name}</span></h3>
      <h3 className="text-[12px] font-bold text-black"><span className="font-extrabold">Price:</span><span className="text-red-600"> {props.data.price} $</span></h3>
      <h3 className="text-[12px] font-bold text-black"><span className="font-extrabold">Status:</span><span className="text-red-600"> {props.data.status}</span></h3>
      <h3 className="text-[12px] font-bold text-black"><span className="font-extrabold">Description:</span><span className="text-red-600"> {props.data.description}</span></h3>
      <div className="flex items-center gap-2 mt-6">
      {!(
        props.beingDeleted?.beingDelete &&
        props.beingDeleted?.id == props.data?.id
      ) ? (
        // <FaTrash style={{color: 'red', marginTop: '25px'}} className='text-[25px]' onClick={handelDelet} color="#8F95A0" />

        <button onClick={handelDelet} className="bg-red-700 text-white w-full py-2 rounded-lg">Delete</button>
      ) : (
        "O'chirilmoqda"
      )}
      <button onClick={handelDetails} className="bg-red-700 text-white w-full  py-2 rounded-lg">About</button>
      </div>
    </div>
  );
};

export default Card;
