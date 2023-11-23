'use client'

import React from 'react'
import axios from 'axios'
import { useToast } from '~/app/components/ui/use-toast'

import { ToastAction } from '~/app/components/ui/toast'
import { Button } from '~/app/components/ui/button'
import { AddGiangVien } from '~/app/dashboard/khoa/gv/components/addGiangVien'
import { EditGiangVien } from '~/app/dashboard/khoa/gv/components/editGiangVien'
import { getItemFromLocalStorage } from '~/utils/localStorage'

function Page() {
  const [data, setData] = React.useState([])
  const { toast } = useToast()

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8080/api/v1/khoa/gv?khoa=${getItemFromLocalStorage('user[khoa]').data.MAKHOA}`)
      setData(res.data.data)
    }
    fetchData()
  }, [])

  const handleDeleteGV = async (magv) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/khoa/gv/${magv}?khoa=${getItemFromLocalStorage('user[khoa]').data.MAKHOA}`)

      alert('Xóa gv thành công')
      // reload lại trang
      window.location.reload()
    } catch (error) {
      toast({
        title: (<h1 className="text-red-600">Lỗi</h1>),
        description: 'Lỗi xóa giảng viên thất bại',
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
        <td className="py-2 px-6 border-b border-gray-200">{item.MAGV}</td>
        <td className="py-2 px-6 border-b border-gray-200">{`${item.HO} ${item.TEN}`}</td>
        <td className="py-2 px-6 border-b border-gray-200">{item.MAKHOA}</td>
        <td className="py-2 px-6 border-b border-gray-200">{item.HOCVI}</td>
        <td className="py-2 px-6 border-b border-gray-200">{item.EMAIL}</td>
        <td className="py-2 px-6 border-b border-gray-200">
          <Button onClick={() => { handleDeleteGV(item.MAGV) }} variant="outline" className="bg-red-700 hover:bg-red-700 hover:text-white text-white">Xóa</Button>
          <EditGiangVien data={item} />
        </td>
      </tr>
    )
  })

  return (
    <div>
      <div>

        <p className="text-center text-lg pb-2">Quản lý Giảng viên</p>
        <div className="shadow-lg rounded-lg overflow-hidden mx-2 md:mx-5">
          <table className="w-full table-fixed">

            <thead>
              <tr className="bg-[#405467]">
                <th className="w-1/5 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Mã giảng viên</th>
                <th className="w-1/4 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Họ tên</th>
                <th className="w-1/5 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Khoa</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Học vị</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Email</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase" />
              </tr>
            </thead>
            <tbody className="bg-white">

              {renderData()}
            </tbody>
          </table>
          <div className="mx-10 my-10">
            <AddGiangVien />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
