
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ProductForm } from "./product-form"
import { getProductsId } from "../products.api"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

async function ProductsNewPage({ params }: { params: { id: number } }) {
    const res = await getProductsId(Number(params.id))
    console.log("🚀 ~ ProductsNewPage ~ res:", res)
    return (
        <div className="flex justify-center h-screen items-center">
            <Card>
                <CardHeader >
                    <CardTitle className="flex justify-between items-center">Create Product
                        <Link className={buttonVariants({ variant: 'default' })} href={'/'}>Go Back</Link>

                    </CardTitle>

                </CardHeader>
                <CardContent>
                    <ProductForm product={res} />
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductsNewPage