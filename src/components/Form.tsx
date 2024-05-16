import React, { FC, useRef } from "react";
interface FormType {
  save: (arg: PhoneType) => void;
  loading: boolean;
}
interface PhoneType {
  name: string | undefined;
  price: number | undefined | string;
  description: string | undefined;
  status: string;
  category_id: string;
}
const Form: FC<FormType> = (props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const discriptionRef = useRef<HTMLTextAreaElement>(null);

  const validate = () => {
    if (!nameRef.current?.value) {
      alert('Name is not empty')
      nameRef.current.focus()
      return false
    }
    if (!priceRef.current?.value) {
      alert('Name is not empty')
      priceRef.current.focus()
      return false
    }
    if (!discriptionRef.current?.value) {
      alert('Name is not empty')
      discriptionRef.current.focus()
      return false
    }
    return true
  }
  function handelSave(event: React.MouseEvent) {
    event.preventDefault();
    let isValid = validate();
    if (isValid) {
      const phone: PhoneType = {
        name: nameRef.current?.value,
        price: priceRef.current?.value,
        description: discriptionRef.current?.value,
        status: "active",
        category_id: "2",
      };
      props.save(phone);
      if (nameRef?.current?.value) {
        nameRef.current.value = "";
      }
      if (priceRef?.current?.value) {
        priceRef.current.value = "";
      }
      if (discriptionRef?.current?.value) {
        discriptionRef.current.value = "";
      }
    }
  }
  return (
    <div>
      <form className="w-[400px]  flex flex-col gap-3 p-4 bg-white rounded-lg mx-auto shadow-lg px-12">
        <label className="text-black" htmlFor="input1">
          Enter Name
        </label>
        <input
          ref={nameRef}
          className="p-2 rounded-lg border-2 bg-[#FAFAFA]"
          type="text"
          name=""
          id="input1"
          placeholder="Enter Name"
        />
        <label className="text-black" htmlFor="input2">
          Enter Price
        </label>
        <input
          ref={priceRef}
          className="p-2 rounded-lg border-2 bg-[#FAFAFA]"
          type="number"
          name=""
          id="input2"
          placeholder="Enter Price"
        />
        <label className="text-black" htmlFor="input3">
          Enter Description
        </label>
        <textarea
          style={{ resize: 'none' }}
          ref={discriptionRef}
          className="p-2 rounded-lg border-2 bg-[#FAFAFA]"
          name=""
          id="input3"
          placeholder="Enter Description "
        ></textarea>
        <button
          onClick={handelSave}
          className={`${props.loading ? 'bg-emerald-700	' : 'bg-blue-700'} ${props.loading ? 'hover:bg-emerald-800' : 'hover:bg-blue-800'} cursor-pointer transition duraticon-250 text-white py-2 px-4 rounded-lg mt-20`}
          disabled={props.loading ? true : false}
        >
          {props.loading ? "Sending" : " Save"}
        </button>
      </form>
    </div>
  );
};

export default Form;
