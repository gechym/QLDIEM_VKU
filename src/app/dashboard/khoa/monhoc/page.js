'use client'

import React from 'react'
import axios from 'axios'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useToast } from '~/app/components/ui/use-toast'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '~/app/components/ui/alert'
import { ToastAction } from '~/app/components/ui/toast'
import { AddMonHoc } from './components/addMonHoc'
import { Button } from '~/app/components/ui/button'
import { EditMonHoc } from './components/editMonHoc'
import { getItemFromLocalStorage } from '~/utils/localStorage'

function Page() {
  const [data, setData] = React.useState([])
  const { toast } = useToast()

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:8080/api/v1/khoa/monhoc')
      setData(res.data.data)
    }
    fetchData()
  }, [])

  const handleDeleteMonHoc = async (mmh) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/khoa/monhoc/${mmh}`)

      alert('Xóa môn học thành công')
      // reload lại trang
      window.location.reload()
    } catch (error) {
      toast({
        title: (<h1 className="text-red-600">Lỗi</h1>),
        description: 'Vui lòng xóa các lớp tính chỉ đã đăng ký môn học trước khi xóa môn học',
        action: (
          <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        ),
      })
    }
  }

  return (
    <div>

      <div>
        <div className="font-bold text-lg mx-10 my-10">
          Môn Học :
        </div>
        <div className="w-full">
          {data.map((item) => (
            <div key={item.MAMH} className="flex items-center px-10 my-1 justify-between w-full">
              <p>{item.TENMH}</p>
              <div className="flex gap-1">
                <Button onClick={() => { handleDeleteMonHoc(item.MAMH) }} variant="outline" className="bg-red-700 hover:bg-red-700 hover:text-white text-white">Xóa</Button>
                <EditMonHoc data={item} />
                <Button variant="outline" className=" bg-green-700 hover:bg-green-700 hover:text-white text-white">Quản lý lớp tín chỉ</Button>
                <Button variant="outline" className=" bg-green-700 hover:bg-green-700 hover:text-white text-white">Quản lý lớp học phần</Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-10 my-10">
          <AddMonHoc />
        </div>
      </div>
      <Alert className="w-[400px] mt-5 ml-5" variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Lưu ý </AlertTitle>
        <AlertDescription>
          Lưu ý xóa các lớp tính chỉ đã đăng ký môn học trước khi xóa môn học
        </AlertDescription>
      </Alert>
    </div>
  )
}

// {
//   "MAMH": "CSDL_PT1",
//   "TENMH": "Hệ CSDL phân tán",
//   "TINCHI": 2,
//   "SOTIET_LT": 30,
//   "SOTIET_TH": 30,
//   "HESO_CC": 0.2,
//   "HESO_BT": 0,
//   "HESO_GK": 0.2,
//   "HESO_CK": 0.6,
// }

export default Page
