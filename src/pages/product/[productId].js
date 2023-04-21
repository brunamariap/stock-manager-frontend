import Link from "next/link";
import { useRouter } from "next/router";

export default function EditProduct() {

    const router = useRouter()

    const productId = router.query.productId

    return (
         <>
            <Link href="/">Voltar</Link>

            <h1>Exibir {productId}</h1>
         </>
    )
}