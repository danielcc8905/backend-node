import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductsId } from "../products.api";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
async function ProductDetailPage({ params }: { params: { id: number } }) {
    const product = await getProductsId(params.id)
    console.log("🚀 ~ file: page.tsx:ProductDetailPage ~ pararms:", product)
    return (
        <div className=" flex justify-center items-center h-screen">
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        Product Detail - {product.id}
                        <Link className={buttonVariants({ variant: 'default' })} href={'/'}>Go Back</Link>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <h1>{ product.name}</h1>
                    <p> { product.description}</p>
                    <p> { product.price}</p>
                    <img src={product.image} alt=""
                    className="w-full h-64 object-cover"
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductDetailPage