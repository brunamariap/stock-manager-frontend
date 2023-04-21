import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const router = useRouter();
  
  const productId = router.query.productId;
  console.log(productId)
  const URL_API = `http://127.0.0.1:8000/produtos/${productId}/`;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [name, setName] = useState('')
  const [value, setValue] = useState(0.0)
  const [amount, setAmount] = useState(0)

  const getData = async () => {

    try {
      setLoading(true);

      const response = await fetch(URL_API);
      const data = await response.json();
      if (!data) throw "Error";
      setData(data);

      setName(data.name)
      setValue(data.unitary_value)
      setAmount(value.amount)

      console.log(data);
  
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  const editData = async () => {
    try {
      setLoading(true);

      const dataTemp = {
        name: name,
        unitary_value: value,
        amount: amount
      }
  
      const response = await fetch(URL_API, {
        method:'PUT', 
        body: JSON.stringify(dataTemp) ,
        headers: {"Content-type": "application/json; chasert=UTF-8"}
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((err) => console.log(err))
      
      const dataT = await response.json()
      if (!dataT) throw "Error";
      setData(dataT);
      console.log(dataT);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {loading && !data &&
        <p>Carregando infomações...</p>
      }

      <a><Link href="/product">Voltar</Link></a>
      {data &&
        <div>
          <h2>Editar Produto</h2>
          <p>Nome <input type='text' onChange={(name) => setName(name.target.value)} defaultValue={data.name}/></p>
          <p>Valor <input type='number' onChange={(unitary_value) => setValue(unitary_value.target.value)} defaultValue={data.unitary_value}/></p>
          <p>Quantidade <input type='number' onChange={(qtd) => setAmount(qtd.target.value)} defaultValue={data.amount}/></p>
          <button onClick={editData}>Enviar</button>
        </div>
      }
      
    </div>
  );
}
