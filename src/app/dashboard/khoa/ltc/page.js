'use client'

import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useToast } from '~/app/components/ui/use-toast'

import { ToastAction } from '~/app/components/ui/toast'
import { Button } from '~/app/components/ui/button'
import { AddLtc } from '~/app/dashboard/khoa/ltc/components/addLtc'
import { EditLtc } from '~/app/dashboard/khoa/ltc/components/editLtc'
import { getItemFromLocalStorage } from '~/utils/localStorage'

function Page() {
  const [data, setData] = React.useState([])
  const [listGV, setListGV] = React.useState([])
  const [listMH, setListMH] = React.useState([])
  const { toast } = useToast()

  React.useEffect(() => {
    const fetchData = async () => {
      const gvs = await axios.get(`http://localhost:8080/api/v1/khoa/gv?${getItemFromLocalStorage('user[khoa]').data.MAKHOA}`)
      const res = await axios.get('http://localhost:8080/api/v1/khoa/ltc')
      const monhoc = await axios.get('http://localhost:8080/api/v1/khoa/monhoc')
      setData(res.data.data)
      setListGV(gvs.data.data)
      setListMH(monhoc.data.data)
    }
    fetchData()
  }, [])

  const handleDeleteLtc = async (mltc) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/khoa/ltc/${mltc}?khoa=${getItemFromLocalStorage('user[khoa]').data.MAKHOA}`)

      alert('Xóa môn học lớp tín chỉ')
      // reload lại trang
      window.location.reload()
    } catch (error) {
      toast({
        title: (<h1 className="text-red-600">Lỗi</h1>),
        description: 'Lỗi tham chiếu khóa ngoại, không thể xóa',
        action: (
          <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        ),
      })
    }
  }

  const renderData = () => data.map((item) => {
    if (item.MAKHOA === getItemFromLocalStorage('user[khoa]').data.MAKHOA) {
      return (
        (
          <tr key={data.MASV}>
            <td className="py-2 px-6 border-b border-gray-200">{`${item.MALTC}`}</td>
            <td className="py-2 px-6 border-b border-gray-200">{`${item.HO} ${item.TEN}`}</td>
            <td className="py-2 px-6 border-b border-gray-200">{item.MAKHOA}</td>
            <td className="py-2 px-6 border-b border-gray-200">{item.TENMH}</td>
            <td className="py-2 px-6 border-b border-gray-200">{item.NHOM}</td>
            <td className="py-2 px-6 border-b border-gray-200">{item.SOSVTOITHIEU}</td>
            <td className="py-2 px-6 border-b border-gray-200">{item.NIENKHOA}</td>
            <td className="py-2 px-6 border-b border-gray-200">{item.HOCKY}</td>
            <td className="py-2 px-6 border-b border-gray-200">
              <Button onClick={() => { handleDeleteLtc(item.MALTC) }} variant="outline" className="bg-red-700 hover:bg-red-700 hover:text-white text-white">Xóa</Button>
              <EditLtc listGV={listGV} listMH={listMH} data={item} />
              <Link href={`/dashboard/khoa/ltc/${item.MALTC}`}>
                <Button variant="outline" className="bg-green-500 hover:bg-green-500 text-white hover:text-white">Lớp học phần</Button>
              </Link>
            </td>
          </tr>
        )
      )
    }
    return null
  })

  return (
    <div>
      <div>

        <p className="text-center text-lg pb-2">Quản lý Lớp tín chỉ</p>
        <div className="shadow-lg rounded-lg overflow-hidden mx-2 md:mx-5">
          <table className="w-full table-fixed">

            <thead>
              <tr className="bg-[#405467]">
                <th className="w-1/5 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Mã Lớp tín chỉ</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Giảng Viên</th>
                <th className="w-1/5 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Khoa</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Tên môn học</th>
                <th className="w-1/6 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Nhóm</th>
                <th className="w-1/6 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Sinh viên tối đa</th>
                <th className="w-1/4 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Niên khóa</th>
                <th className="w-1/6 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Học kỳ</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">-</th>
              </tr>
            </thead>
            <tbody className="bg-white">

              {renderData()}
            </tbody>
          </table>
          <AddLtc listGV={listGV} listMH={listMH} />
        </div>
      </div>
    </div>
  )
}

export default Page
