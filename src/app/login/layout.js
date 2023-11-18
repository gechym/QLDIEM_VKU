import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import logo2 from '~/images/logo2.png'
import sict2 from '~/images/sict2.jpg'
import '~/app/globals.css'

const layout = ({ children }) => (
  <div className="flex w-screen h-screen">
    <div className="flex-1 flex justify-center flex-col">
      {children}
    </div>
    <div className="w-[500px] px-8 flex flex-col justify-center items-center pb-[100px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]">
      <Image src={logo2} width={360} height={65} alt="logo" />
      <Image src={sict2} width={360} height={160} alt="logo" />
      <Link className="bg-[#5CB85C] my-2 text-white font-bold py-2 px-4 w-[280px] text-center rounded" href="/login/khoa">Đăng nhập dành cho khoa</Link>
      <Link className="bg-[#5CB85C] my-2 text-white font-bold py-2 px-4 w-[280px] text-center rounded" href="/login/sinhvien">Đăng nhập dành cho sinh viên</Link>
      <Link className="bg-[#5CB85C] my-2 text-white font-bold py-2 px-4 w-[280px] text-center rounded" href="/login/giangvien">Đăng nhập dành cho giảng viên</Link>
      <p className="pt-5">
        Mọi thắc mắc, sự cố xảy ra khi sử dụng các hệ thống,
        Quý thầy vui lòng liên lạc trực tiếp inbox Phòng Đào tạo
        {' '}
        <b className="text-blue-700">http://fb.com/daotao.vku.udn.vn</b>
        {' '}
        hoặc email
        {' '}
        <b className="text-blue-500">daotao@vku.udn.vn</b>
        {' '}
        để được hỗ trợ hướng dẫn.
      </p>
    </div>
  </div>
)

export default layout
