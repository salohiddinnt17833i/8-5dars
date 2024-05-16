import { useEffect, useState } from "react";
import Card from "../components/Card";
import { PuffLoader } from "react-spinners";
import Form from "../components/Form";
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
interface beingDeletedType {
  id: string;
  beingDeleted: boolean;
}
interface PhoneTypeCreate {
  name: string | undefined;
  price: number | undefined | string;
  description: string | undefined;
  status: string;
  category_id: string;
}
function Home() {
  const [data, setData] = useState<PhoneType[]>([]);
  const [beingDeleted, setBeingDeleted] = useState<beingDeletedType>({
    id: "n",
    beingDeleted: false,
  });
  const [createLoading, setCreatedLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  async function getData(url: string) {
    setLoading(true);
    const resp = await fetch(url);
    const d = await resp
      .json()
      .finally(() => {
        setLoading(false);
      });
    setData(d);
  }

  useEffect(() => {
    getData("https://auth-rg69.onrender.com/api/products/all");
  }, []);
  function deletItem(id: string) {
    if (id) {
      fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((d) => {
          if (d.message == "Mahsulot muvaffaqiyatli o'chirildi") {
            setBeingDeleted({ id: id, beingDeleted: true });
            let copied = JSON.parse(JSON.stringify(data));
            copied = copied.filter((el: PhoneType) => {
              return el.id != id;
            });
            setData(copied);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setBeingDeleted({ id: id, beingDeleted: false });
        });
    }
  }
  function handelSave(phone: PhoneTypeCreate) {
    // (phone.status = "active"), (phone.category_id = "2");
    setCreatedLoading(true);
    fetch("https://auth-rg69.onrender.com/api/products/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(phone),
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.id) {
          let copied = JSON.parse(JSON.stringify(data));
          copied.push(d);
          setData(copied);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setCreatedLoading(false);
      });
  }
  return (
    <div>
      <div className="w-[1200px] flex flex-col mx-auto pt-20">
        <Form loading={createLoading} save={handelSave}></Form>
        {loading ? (
          <PuffLoader className="mx-auto text-5xl"></PuffLoader>
        ) : (
          <div className="w-[1200px] mt-10 flex flex-wrap justify-center">
            {data.length &&
              data.map((phone, index) => {
                return (
                  <Card
                    key={index}
                    beingDeleted={beingDeleted}
                    deletItem={deletItem}
                    data={phone}
                  ></Card>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
