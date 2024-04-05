import React from 'react'
import Image from 'next/image'

const WorkExperienceCard = ({ title, company, year, logo }) => {
  return (
    <div className='flex rounded-lg bg-bgcolorSoft h-auto align-middle items-center px-2 my-2'>
      <div className='flex w-24 h-24 align-middle items-center'>
        <Image src={logo} alt={company + " " + logo} width={60} height={60} className='rounded-full w-16'></Image>
      </div>
      <div className='flex-col justify-around text-sm md:text-base'>
        <h3 className='font-bold'>{title}</h3>
        <p className='font-light'>{company}</p>
        <p className='font-normal'>{year}</p>
      </div>
    </div>
  )
}

export default WorkExperienceCard
