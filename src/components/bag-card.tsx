'use client'

import { FC,useState } from 'react'
import Image1 from '../../public/images/hero1.webp'
import Image from 'next/image'

interface BagCardProps {
  
}

const BagCard: FC<BagCardProps> = ({}) => {
    const [quantity,setQuantity] = useState<number>(0) 

    const handleIncreaseQuantity = ()=>{
            setQuantity((prevQuantity) => prevQuantity + 1);
    }

    const handleDecreaseQuantity = ()=>{
        if (quantity > 0) {
            setQuantity((prevQuantity) => prevQuantity - 1);
          }
    }
  return (
    <div className='my-5 flex w-full justify-between gap-x-10 border-b border-slate-200 pb-3 dark:border-slate-700 lg:w-11/12'>
        <div className='flex gap-x-5 lg:w-2/3'>
            <div className='relative h-20 w-1/2 '>
                <Image src={Image1} alt='image' fill className='object-cover' />
            </div>
            <div className='flex flex-col justify-between gap-y-2'>
                <div className='space-y-2'>
                <p className='text-sm'>Atlas Short / Olive Seersucker</p>
                <p className='text-sm text-slate-400 dark:text-slate-300'>SIZE: 32</p>
                </div>
                <div className='flex items-center gap-x-4'>
                    <button onClick={handleDecreaseQuantity} className=''>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncreaseQuantity} className=''>+</button>
                </div>
            </div>
        </div>
        <div className='flex flex-col justify-between'>
            <p className='text-sm'>$128.00</p>
            <p className='w-fit cursor-pointer border-b border-slate-400 pb-1 text-xs text-slate-400'>Remove</p>
        </div>
    </div>
  )
}

export default BagCard