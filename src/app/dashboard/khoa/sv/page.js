'use client'

import React from 'react'
import axios from 'axios'
import { useToast } from '~/app/components/ui/use-toast'

import { ToastAction } from '~/app/components/ui/toast'
import { Button } from '~/app/components/ui/button'
import { AddSinhVien } from '~/app/dashboard/khoa/sv/components/addSinhVien'
import { EditSinhVien } from '~/app/dashboard/khoa/sv/components/editSinhVien'

function Page() {
  const [data, setData] = React.useState([])
  const { toast } = useToast()

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:8080/api/v1/khoa/sv')
      setData(res.data.data)
    }
    fetchData()
  }, [])

  const handleDeleteSinhVien = async (mmh) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/khoa/sv/${mmh}`)

      alert('Xóa môn học thành công')
      // reload lại trang
      window.location.reload()
    } catch (error) {
      toast({
        title: (<h1 className="text-red-600">Lỗi</h1>),
        description: 'Vui lòng cho sinh viên rời lớp đang học trước khi xóa sinh viên',
        action: (
          <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        ),
      })
    }
  }

  const renderData = () => data.map((item) => {
    console.log(item)

    return (
      <tr key={data.MASV}>
        <td className="py-2 px-6 border-b border-gray-200">{item.MASV}</td>
        <td className="py-2 px-6 border-b border-gray-200">{`${item.HO} ${item.TEN}`}</td>
        <td className="py-2 px-6 border-b border-gray-200">{item.GIOITINH}</td>
        <td className="py-2 px-6 border-b border-gray-200">{item.DIACHI}</td>
        <td className="py-2 px-6 border-b border-gray-200">{item.NGAYSINH}</td>
        <td className="py-2 px-6 border-b border-gray-200">{item.MALOP}</td>
        <td className="py-2 px-6 border-b border-gray-200">{item.EMAIL}</td>
        <td className="py-2 px-6 border-b border-gray-200">
          <Button onClick={() => { handleDeleteSinhVien(item.MASV) }} variant="outline" className="bg-red-700 hover:bg-red-700 hover:text-white text-white">Xóa</Button>
          <EditSinhVien data={item} />
        </td>
      </tr>
    )
  })

  return (
    <div>
      <div>

        <p className="text-center text-lg pb-2">Quản lý sinh viên</p>
        <div className="shadow-lg rounded-lg overflow-hidden mx-2 md:mx-5">
          <table className="w-full table-fixed">

            <thead>
              <tr className="bg-[#405467]">
                <th className="w-1/5 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Mã sinh viên</th>
                <th className="w-1/4 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Ho tên</th>
                <th className="w-1/5 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Giới tính</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Địa chỉ</th>
                <th className="w-1/4 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Ngày sinh</th>
                <th className="w-1/5 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Mã Lớp học</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Email</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">-</th>
              </tr>
            </thead>
            <tbody className="bg-white">

              {renderData()}
            </tbody>
          </table>
          <AddSinhVien />
        </div>
      </div>
    </div>
  )
}

export default Page
