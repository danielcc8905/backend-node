import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductsId } from "../products.api";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
async function ProductDetailPage({ params }: { params: { id: number } }) {
    const product = await getProductsId(params.id)
    const formattedPrice = product.price.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'COP' // Ajusta la moneda según tus necesidades
      });
    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-1/2">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        Product Detail - {product.id}
                        <Link className={buttonVariants({ variant: 'default' })} href={'/'}>Go Back</Link>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <h1>{ product.name}</h1>
                    <p className="break-words text-truncate"> { product.description}</p>
                    <p className="text-black font-bold mt-2 mb-2">  ${formattedPrice}</p>
                    <img src={product.image} alt=""
                    className="w-full h-64 object-cover rounded-lg"
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductDetailPage