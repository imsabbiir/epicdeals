import Image from 'next/image'
import React from 'react'
const banner = [
    "https://i.ibb.co.com/ZfWQvwc/haircare.webp",
    "https://i.ibb.co.com/T8psy3L/skincare.webp",
    "https://i.ibb.co.com/8P6zbwY/electronics.webp",
    "https://i.ibb.co.com/V20Wr5n/baby.webp",
    "https://i.ibb.co.com/Zm8Vd8M/banner.webp",
    "https://i.ibb.co.com/NsH2pQX/zdrop-01.webp",
    "https://i.ibb.co.com/28Y10hk/zdrop-02.webp"
  ]
function SingleBanner({bannerId}) {
  return (
     <div className='w-full mt-10'>
        <div className='w-[90%] mx-auto'>
            <div className='w-full h-[180ox]'>
                <Image 
                    src={banner[bannerId]}
                    alt='EpicDeals'
                    width={2500}
                    height={2500}
                    className='w-full h-72 object-contain'
                />
            </div>
        </div>
    </div>
  )
}

export default SingleBanner