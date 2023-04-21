import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const URL_API = 'http://127.0.0.1:8000/produtos/'

export default function CreateProduct() {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [name, setName] = useState('')
  const [value, setValue] = useState(0.0)
  const [amount, setAmount] = useState(0)

  const postData = async () => {
    try {
      setLoading(true)

      const dataTemp = {
        name: name,
        unitary_value: value,
        amount: amount
      }

      const response = await fetch(URL_API, {
        method:'POST', 
        body: JSON.stringify(dataTemp) ,
        headers: {"Content-type": "application/json; chasert=UTF-8"}
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((err) => console.log(err))


      const data = await response.json()
      if (!data) throw 'Error'
      setData(data)
      console.log(data)
      
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>

      <h1>Criar produto</h1>
      <p>Nome <input type='text' onChange={(name) => setName(name.target.value)}/></p>
      <p>Valor <input type='number' onChange={(unitary_value) => setValue(unitary_value.target.value)}/></p>
      <p>Quantidade <input type='number' onChange={(qtd) => setAmount(qtd.target.value)}/></p>
      <button onClick={postData}>Enviar</button>
      {loading && !data &&
        <p>Carregando infomações...</p>
      }

    </div>
  )
}
