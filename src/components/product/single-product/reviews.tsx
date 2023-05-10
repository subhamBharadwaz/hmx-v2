import { cn } from '@/lib/utils'
import { IReview } from '@/types'
import { FC } from 'react'

interface ReviewProps {
  reviews: IReview[],
  ratings: number,
  numberOfReviews: number,
  className?: string
}

const Reviews: FC<ReviewProps> = ({reviews,ratings,numberOfReviews,className}) => {
  return <div className={cn('my-10 w-full  justify-between space-y-5 md:flex md:w-2/3', className)}>
    <div className='border-spacing-y-2'>
    <h3 className='text-2xl font-bold text-foreground lg:text-4xl'>Reviews</h3>
     <h3 className='text-6xl font-bold text-foreground lg:text-8xl'>{ratings}</h3>
     <p className='text-md font-semibold text-foreground lg:text-xl'>Based on {numberOfReviews} Reviews</p>
    </div>
    <div className='space-y-3 md:w-2/3'>
        {reviews?.map(review=>(
            <div key={review._id}>
                <h4 className='text-lg font-semibold text-foreground lg:text-2xl'>{`${review?.userInfo?.firstName} ${review?.userInfo?.lastName}`}</h4>
                <p className='text-md text-slate-700 lg:text-lg'>{review?.comment}</p>
            </div>
        ))}
    </div>
  </div>
}

export default Reviews