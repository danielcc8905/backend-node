"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useForm } from 'react-hook-form'
import React from 'react'
import { createProduct, updateProduct } from '../products.api'
import { useParams, useRouter } from 'next/navigation'

export function ProductForm({ product }: any) {
   console.log("🚀 ~ ProductForm ~ product:", product)
   const { register, handleSubmit } = useForm({
      defaultValues:  {
         name: product.name || '',
         description: product.description || '',
         price: product.price || null,
         image: product.image || ''
       }
   });
   const router = useRouter();
   const params = useParams();
   const onSubmit = async (data: any) => {
     if(params.id){
      await updateProduct(Number(params.id), { ...data, price: parseFloat(data.price) });
     }else{
       await createProduct({ ...data, price: parseFloat(data.price) });
     }
      router.push('/')
      router.refresh()
   };
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <Label>
            Product Name
         </Label>
         <Input {...register("name")} />
         <Label>
            Description
         </Label>
         <Input {...register("description")} />
         <Label>
            Price
         </Label>
         <Input  {...register("price")} />
         <Label>
            Image
         </Label>
         <Input {...register("image")} />
         {
            product.image !== "" && <div className='mt-4'><img className='w-64' src={product.image} alt="" /></div>
         }
         <Button type="submit" className="mt-4">{params.id ? "Update" : "Create"}</Button>
      </form>
   )
}
