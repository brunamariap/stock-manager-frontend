import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from "axios"

const inter = Inter({ subsets: ['latin'] })

const URL_API = 'http://127.0.0.1:8000/produtos/'

export default function Home() {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const router = useRouter()
  
  const allData = async () => {
    try {
      setLoading(true)

      const response = await axios.get(URL_API)

      //const data = await response.json()
      if (!response.data) throw 'Error'
      setData(response.data)
      console.log(response.data)
      
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    allData()
  }, [])

  return (
    <div className={styles.container}>
      <a><Link href="/">Voltar</Link></a>
      <h1>Controle de estoque</h1>
      <p>Lista de produtos</p>

      <br></br>
      <h2><Link href='/product/createProduct'>Criar Produto</Link></h2>

      <br></br>

      {data &&
        data.map((item) => (
          <div>
            <h3>{item.name}</h3>
            <p>Valor: {item.unitary_value}</p>
            <p>Quantidade: {item.amount}</p>
            <p><Link href={`/product/${item.id}`}>Editar Produto</Link></p>
            <p><Link href={`/product/sell/${item.id}`}>Vender Produto</Link></p>
            <br></br>
          </div>
        ))
      }
    </div>
  )
}
