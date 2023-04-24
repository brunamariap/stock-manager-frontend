import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function sellProduct() {
  const router = useRouter();

  const productId = router.query.sellProduct;
  console.log(productId);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [dataProductS, setDataProductS] = useState(null);
  const [dataTest, setDataTest] = useState(null)

  const [name, setName] = useState("");
  const [value, setValue] = useState(0.0);
  const [amount, setAmount] = useState(0);

  const [soldAmount, setSoldAmount] = useState(0);
  const [finalValue, setFinalValue] = useState(0.0);

  const URL_API = `http://127.0.0.1:8000/produtos/${productId}`;
  const URL_API_PRODUCT_SOLD = "http://127.0.0.1:8000/produtos-vendidos/";
  const getData = async () => {
    try {
      setLoading(true);

      const response = await fetch(URL_API);
      const data = await response.json();
      if (!data) throw "Error";
      setData(data);

      setAmount(data.amount);

      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const sell = async () => {
    try {
      setLoading(true);
      
      setAmount(amount - soldAmount)

      const dataTemp = {
        product: productId,
        sold_amount: soldAmount,
        final_value: finalValue * soldAmount,
      };

      const response = await fetch(URL_API_PRODUCT_SOLD, {
        method: "POST",
        body: JSON.stringify(dataTemp),
        headers: { "Content-type": "application/json; chasert=UTF-8" },
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((err) => console.log(err));

      const dataT = await response.json();
      if (!dataT) throw "Error";
      setDataProductS(dataT);
      
      const dataEdit = {
        name: data.name,
        unitary_value: data.unitary_value,
        amount: amount,
      };

      const responseEdit = await fetch(URL_API, {
        method: "PUT",
        body: JSON.stringify(dataEdit),
        headers: { "Content-type": "application/json; chasert=UTF-8" },
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((err) => console.log(err))
      
      const dataAtual = await response.json();
      if (!dataAtual) throw "Error";
      dataTest(dataAtual);

      console.log(dataAtual);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {loading && !data && <p>Carregando infomações...</p>}

      {data && (
        <div>
          <a>
            <Link href="/product">Voltar</Link>
          </a>
          <h2>Vender Produto</h2>
          <p>Produto: {data.name}</p>
          <p>Quantidade disponível: {data.amount}</p>
          <p>
            Digite a quantidade que deseja vender{" "}
            <input
              type="text"
              onChange={(amount) => setSoldAmount(amount.target.value)}
              max={data.amount}
            />
          </p>
          <p>Valor final: {soldAmount * data.unitary_value}</p>
          <button onClick={sell}>Enviar</button>
        </div>
      )}
    </div>
  );
}
