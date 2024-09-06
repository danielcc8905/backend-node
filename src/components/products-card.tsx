'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { deleteProduct } from '@/app/products/products.api'
import { useRouter } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

export function ProductsCard({ product }: any) {
  const router = useRouter()
  async function deleteCard(id: number) {
    await deleteProduct(id)
    router.refresh()

  }
  const formattedPrice = product.price.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'COP' // Ajusta la moneda según tus necesidades
  });
  return (
    <Card onClick={() => router.push(`/products/${product.id}`)} key={product.id}>
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
          {product.name}
          <span className='ml-2 text-sm text-gray-600 font-bold'>
            ${formattedPrice}
          </span>
        </CardTitle>
      </CardHeader>
      <div className='w-full h-48 mb-4'>
        <img className='max-h-48 w-full' src={product.image} alt={product.name} />
      </div>
      <CardContent>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className='max-w-md truncate cursor-pointer'>{product.description}</p>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ver más</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <CardFooter className='flex justify-around'>
          <Button onClick={(e) => {
            e.stopPropagation()
            router.push(`/products/${product.id}/edit`)
          }} className='mt-4'>Editar</Button>
          <Button onClick={(e) => {
            e.stopPropagation()
            deleteCard(product.id)
          }} className='mt-4' variant={'destructive'}>Eliminar</Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}

