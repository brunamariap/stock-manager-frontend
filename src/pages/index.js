import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <h1>Controle de estoque</h1>
      <br></br>
      <h2><Link href='/product'>Lista de produtos</Link></h2>
    </div>
  )
}
