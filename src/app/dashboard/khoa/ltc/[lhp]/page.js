'use client'

import React from 'react'
import axios from 'axios'
import { useToast } from '~/app/components/ui/use-toast'

import { ToastAction } from '~/app/components/ui/toast'
import { Button } from '~/app/components/ui/button'
import { getItemFromLocalStorage } from '~/utils/localStorage'
import { AddLhp } from './components/addLhp'

function Page({ params: { lhp } }) {
  const [data, setData] = React.useState([])
  const [sv, setSV] = React.useState([])
  const { toast } = useToast()

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8080/api/v1/khoa/diem/${lhp}?khoa=${getItemFromLocalStorage('user[khoa]').data.MAKHOA}`)
      const resSV = await axios.get(`http://localhost:8080/api/v1/khoa/sv?khoa=${getItemFromLocalStorage('user[khoa]').data.MAKHOA}`)
      setData(res.data.data)
      setSV(resSV.data.data)
    }
    fetchData()
  }, [])

  const handleDeleteLtc = async (msv) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/khoa/diem/${lhp}?masv=${msv}&khoa=${getItemFromLocalStorage('user[khoa]').data.MAKHOA}`)

      alert('Xóa thành công')
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

  const renderData = () => data.map((item) => (
    (
      <tr key={data.MASV}>
        <td className="py-2 px-6 border-b border-gray-200">{`${item.MALTC}`}</td>
        <td className="py-2 px-6 border-b border-gray-200">{`${item.MASV}`}</td>
        <td className="py-2 px-6 border-b border-gray-200">{`${item.HO} ${item.TEN}`}</td>
        <td className="py-2 px-6 border-b border-gray-200">{item.MALOP}</td>
        <td className="py-2 px-6 border-b border-gray-200">{item.DEIM_CC}</td>
        <td className="py-2 px-6 border-b border-gray-200">{item.DEIM_BT}</td>
        <td className="py-2 px-6 border-b border-gray-200">{item.DIEM_GK}</td>
        <td className="py-2 px-6 border-b border-gray-200">{item.DIEM_CK}</td>
        <tr className="py-2 px-6 border-b border-gray-200 flex justify-center">
          <Button onClick={() => { handleDeleteLtc(item.MASV) }} variant="outline" className="bg-red-700 hover:bg-red-700 hover:text-white text-white">Hủy Kết quả</Button>
        </tr>
      </tr>
    )
  ))

  return (
    <div>
      <div>

        <p className="text-center text-lg pb-2">
          Quản lý sinh viên đăng ký học phần
          {' '}
          {decodeURIComponent(lhp)}
        </p>
        <div className="shadow-lg rounded-lg overflow-hidden mx-2 md:mx-5">
          <table className="w-full table-fixed">

            <thead>
              <tr className="bg-[#405467]">
                <th className="w-1/5 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Mã Lớp tín chỉ</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Mã Sinh viên</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Tên Sinh viên</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Mã Lớp</th>
                <th className="w-1/5 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Điểm CC</th>
                <th className="w-1/5 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Điểm BT</th>
                <th className="w-1/5 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Điểm CK</th>
                <th className="w-1/6 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Điểm GK</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">-</th>
              </tr>
            </thead>
            <tbody className="bg-white">

              {renderData()}
            </tbody>
          </table>
          <AddLhp data={data} lhp={decodeURIComponent(lhp)} sv={sv} />
        </div>
      </div>
    </div>
  )
}

export default Page
