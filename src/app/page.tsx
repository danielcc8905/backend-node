import Link from 'next/link';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { getProducts } from './products/products.api'
import { ProductsCard } from '../components/products-card';

export const dynamic = 'force-dynamic'
async function HomePage() {
  const products = await getProducts();
  console.log("🚀 ~ HomePage ~ products:", products)
  return (
    <>
      <div className='flex justify-between mb-4'>
        <h1 className='text-4xl font-bold'>
          NextNestApp
        </h1>
        <Link
          href={'/products/new'}
          className={buttonVariants({ variant: 'default' })}
        >
          Create Product
        </Link>
      </div>
      <h2 className='text-2xl font-semibold mb-2'>Lista de productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((product: any) => (
         <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default HomePage;