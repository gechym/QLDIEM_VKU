'use client'

import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getItemFromLocalStorage } from '~/utils/localStorage'

function Page() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/giangvien/get-hoc-phan/${getItemFromLocalStorage('user[gv]').data.MAGV}`)
        setData(res.data.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    getData()
  }, [])

  return (
    <div className="max-h-screen h-screen">
      <p className="bg-[#3FC1A5] text-white p-2 m-2 rounded-md">Các lớp học phần đang phụ trách giảng dạy</p>
      {
        data.map((item, index) => (
          <div className="flex my-4 items-center justify-between px-10" key={item.MALTC}>
            <p>{`${item.TENMH} ${item.NHOM}`}</p>
            {/* CSS STYLE BUTTON LINK */}
            <Link className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" href={`/dashboard/qlmonhoc/${item.MALTC}`}>Quản lý lớp học phần</Link>
          </div>
        ))
      }
    </div>
  )
}

export default Page
