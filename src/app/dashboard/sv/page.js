'use client'

import axios from 'axios'
import React from 'react'
import { getItemFromLocalStorage } from '~/utils/localStorage'

function Page() {
  const [data, setData] = React.useState()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const msv = getItemFromLocalStorage('user[sv]')?.data.MASV
        const res = await axios.get(`http://localhost:8080/api/v1/sinhvien?masv=${msv}`)
        setData(res.data.data[0])
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="max-h-screen">
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <div className="relative flex flex-col items-center rounded-[20px] w-[800px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
          <div className="mt-2 mb-8 w-full">
            <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
              Thông tin sinh viên
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-4 px-2 w-full">
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Mã sinh viên</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {data?.MASV}
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Họ và tên</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {`${data?.HO} ${data?.TEN}`}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Khóa học</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {data?.KHOAHOC}
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Lớp</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {data?.TENLOP}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Địa chỉ thường trú</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {data?.DIACHI}
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Ngày sinh</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {data?.NGAYSINH}
              </p>
            </div>
          </div>
        </div>
        <p className="font-normal text-navy-700 mt-20 mx-auto w-max">
          (Đây là thông tin sinh viên được cập nhật từ hệ thống của trường,
          để điều chỉnh thông tin sinh viên, vui lòng liên hệ với phòng đào tạo)
        </p>
      </div>
    </div>
  )
}

export default Page
