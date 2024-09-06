"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useForm } from 'react-hook-form'
import React from 'react'
import { createProduct, updateProduct } from '../products.api'
import { useParams, useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'

export function ProductForm({ product }: any) {
   const { register, handleSubmit, formState: { errors } } = useForm({
      defaultValues:  {
         name: product.name || '',
         description: product.description || '',
         price: product.price || '',
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
         {/* Product Name */}
         <Label>
            Product Name
         </Label>
         <Input maxLength={30} {...register("name", { required: "Product name is required" })} />
         {errors.name && <p className="text-red-500 text-sm">{errors.name?.message?.toString()}</p>} 
         {/* Description */}
         <Label>
            Description
         </Label>
         <Textarea  maxLength={300} {...register("description", { required: "Description is required" })} />
         {errors.description && <p className="text-red-500 text-sm">{errors.description?.message?.toString()}</p>}

         {/* Price */}
         <Label>
            Price
         </Label>
         <Input  {...register("price", {
            required: "Price is required",
            pattern: {
               value: /^[0-9]*[.,]?[0-9]+$/,
               message: "Only numbers and decimals are allowed"
            },
            validate: (value) => parseFloat(value) > 0 || "Price must be a positive number"
         })} />
         {errors.price && <p className="text-red-500 text-sm">{errors.price?.message?.toString()}</p>}

         {/* Image */}
         <Label>
            Image
         </Label>
         <Input {...register("image", { required: "Image URL is required" })} />
         {errors.image && <p className="text-red-500 text-sm">{errors.image?.message?.toString()}</p>} 
         
         {/* Image preview */}
         {product.image !== "" && <div className='mt-4'><img className='w-64' src={product.image} alt="" /></div>}

         {/* Submit button */}
         <Button type="submit" className="mt-4">{params.id ? "Update" : "Create"}</Button>
      </form>
   )
}
