import React from 'react'
import Image from 'next/image'
import profilePic from '~/images/vku.jpg'

const page = () => (
  <Image
    src={profilePic}
    alt="Picture of the author"
  />
)

export default page
