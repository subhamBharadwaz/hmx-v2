'use client'

import { FC,useEffect } from 'react'
import Image from 'next/image'
import Container from '../container'
import VisionariesSwiper from './visionaries-swiper'
import {motion, stagger, useAnimate, useInView} from 'framer-motion'

interface VisionariesSectionProps {
  
}

const VisionariesSection: FC<VisionariesSectionProps> = ({}) => {
  const [scope, animate] = useAnimate()
  
  const isInView = useInView(scope, {once: true})
  useEffect(()=>{
    if(isInView){
      animate('h2', {opacity:[0,1], y:[50,0]}, {duration:1})
      animate('#vision-container', {opacity:[0,1], y:[150,0]},{delay: stagger(0.2), duration:.8})
      animate('h3', {opacity:[0,1]},{delay: stagger(0.2), duration:2})
      animate('p', {opacity:[0,1]},{delay: stagger(0.2), duration:2})
    }
  },[animate, isInView])

  return (
    <section  ref={scope}  className="min-h-[50vh] bg-neutral-900 py-20">
    <Container>
      <h2 className="text-center text-2xl font-semibold text-slate-100 md:text-3xl lg:text-4xl">
        Visionaries
      </h2>
      <div className="my-20">
        <div className="mt-16 hidden grid-rows-1 gap-5 md:grid md:grid-cols-3">
          <div id='vision-container' className="relative  overflow-hidden md:h-96  lg:h-[80vh]">
            <Image
              src="https://images.pexels.com/photos/8345977/pexels-photo-8345977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="man giving a speech"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-5 bg-slate-800/40">
              <h3 className="font-semibold text-slate-100 lg:text-2xl 2xl:text-4xl">
                Michael Rodriguez
              </h3>
              <p className="lg:text-md px-5 text-center text-sm text-slate-200 2xl:text-lg">
                Michael Rodriguez, our visionary Head of Marketing, plays a
                pivotal role in shaping HMX&apos;s brand identity and
                driving customer engagement.
              </p>
            </div>
          </div>
          <div id='vision-container' className="relative  overflow-hidden  md:h-96 lg:h-[80vh] ">
            <Image
              src="https://images.pexels.com/photos/15761320/pexels-photo-15761320/free-photo-of-girl-posing-in-a-fashionable-outfit.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="man giving a speech"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-5 bg-slate-800/40">
              <h3 className="text-xl font-semibold text-slate-100 lg:text-2xl 2xl:text-4xl">
                Elias Jara
              </h3>
              <p className="lg:text-md px-5 text-center text-sm text-slate-200 2xl:text-lg">
                Elias Jara, our dedicated Director of Customer Experience,
                is passionate about delivering exceptional service to our
                valued customers.
              </p>
            </div>
          </div>
          <div id='vision-container' className="relative overflow-hidden  md:h-96  lg:h-[80vh]">
            <Image
              src="https://images.pexels.com/photos/15141516/pexels-photo-15141516/free-photo-of-man-speaking-on-a-meeting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="man giving a speech"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-5 bg-slate-800/40">
              <h3 className="text-xl font-semibold text-slate-100 lg:text-2xl 2xl:text-4xl">
                Matheus Bertelli
              </h3>
              <p className="lg:text-md px-5 text-center text-sm text-slate-200 2xl:text-lg">
                Matheus Bertelli, our brilliant CTO, leads the technical
                team at HMX, overseeing the development and implementation
                of innovative solutions that power our e-commerce platform.
              </p>
            </div>
          </div>
        </div>
        <VisionariesSwiper />
      </div>
    </Container>
  </section>
  )
}

export default VisionariesSection