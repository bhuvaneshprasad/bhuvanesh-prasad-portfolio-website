import React from 'react'

function SectionTitle({title}) {
    return (
        
      <div className="flex w-full pt-5">
        <h2 className="landingSectionTitle max-w-sm md:max-w-max mx-auto md:mx-0 text-center md:text-left relative text-3xl font-bold mb-10 pt-4 md:pt-0 md:w-max">
          {title}
        </h2>
      </div>
    )
}

export default SectionTitle