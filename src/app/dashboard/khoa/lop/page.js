'use client'

import React from 'react'
import axios from 'axios'
import { useToast } from '~/app/components/ui/use-toast'

import { ToastAction } from '~/app/components/ui/toast'
import { Button } from '~/app/components/ui/button'
import { AddLop } from '~/app/dashboard/khoa/lop/components/addLop'
import { EditLop } from '~/app/dashboard/khoa/lop/components/editLop'
import { getItemFromLocalStorage } from '~/utils/localStorage'

function Page() {
  const [data, setData] = React.useState([])
  const { toast } = useToast()

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8080/api/v1/khoa/lop?khoa=${getItemFromLocalStorage('user[khoa]').data.MAKHOA}`)
      setData(res.data.data)
    }
    fetchData()
  }, [])

  const handleDeleteLop = async (malop) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/khoa/lop/${malop}?khoa=${getItemFromLocalStorage('user[khoa]').data.MAKHOA}`)

      alert('Xóa lớp thành công')
      // reload lại trang
      window.location.reload()
    } catch (error) {
      toast({
        title: (<h1 className="text-red-600">Lỗi</h1>),
        description: 'Lỗi xóa lớp thất bại',
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
        <td className="py-2 px-6 border-b border-gray-200">{item.MALOP}</td>
        <td className="py-2 px-6 border-b border-gray-200">{item.TENLOP}</td>
        <td className="py-2 px-6 border-b border-gray-200">{item.KHOAHOC}</td>
        <td className="py-2 px-6 border-b border-gray-200">{item.MAKHOA}</td>
        <td className="py-2 px-6 border-b border-gray-200">
          <Button onClick={() => { handleDeleteLop(item.MALOP) }} variant="outline" className="bg-red-700 hover:bg-red-700 hover:text-white text-white">Xóa</Button>
          <EditLop data={item} />
        </td>
      </tr>
    )
  })

  return (
    <div>
      <div>

        <p className="text-center text-lg pb-2">
          Quản lý Lớp học theo khoa
          {' '}
          {`${getItemFromLocalStorage('user[khoa]').data.MAKHOA}`}
        </p>
        <div className="shadow-lg rounded-lg overflow-hidden mx-2 md:mx-5">
          <table className="w-full table-fixed">

            <thead>
              <tr className="bg-[#405467]">
                <th className="w-1/5 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Mã Lớp</th>
                <th className="w-1/2 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Tên lớp</th>
                <th className="w-1/5 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Khóa học</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Mã Khoa</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase" />
              </tr>
            </thead>
            <tbody className="bg-white">

              {renderData()}
            </tbody>
          </table>
          <div className="mx-10 my-10">
            <AddLop />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
