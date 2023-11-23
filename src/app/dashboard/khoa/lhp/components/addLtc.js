'use client'

import React from 'react'
import axios from 'axios'
import { Button } from '~/app/components/ui/button'
import { getItemFromLocalStorage } from '~/utils/localStorage'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/app/components/ui/dialog'
import { Input } from '~/app/components/ui/input'
import { Label } from '~/app/components/ui/label'

// eslint-disable-next-line import/prefer-default-export
export function AddLtc({ listGV, listMH }) {
  const [MALTC, setMALTC] = React.useState('')
  const [MAGV, setMAGV] = React.useState('')
  const [MAKHOA, setMAKHOA] = React.useState(getItemFromLocalStorage('user[khoa]').data.MAKHOA)
  const [MAMH, setMAMH] = React.useState()
  const [NHOM, setNHOM] = React.useState()
  const [SOSVTOITHIEU, setSOSVTOITHIEU] = React.useState()
  const [NIENKHOA, setNIENKHOA] = React.useState()
  const [HOCKY, setHOCKY] = React.useState()

  const [error, setError] = React.useState('')

  const handleUpdateState = (value, setFun) => {
    setFun(value)
    setError('')
  }

  const handleSubmit = async () => {
    const dataEdit = {
      MALTC: `${MALTC}-${getItemFromLocalStorage('user[khoa]').data.MAKHOA}`,
      MAGV,
      MAKHOA,
      MAMH,
      NHOM,
      SOSVTOITHIEU,
      NIENKHOA,
      HOCKY,
    }
    try {
      const res = await axios.post('http://localhost:8080/api/v1/khoa/ltc', dataEdit)
      alert('Thêm Lớp tín chỉ thành công')
      // reload lại trang
      window.location.reload()
    } catch (e) {
      setError(e.response.data.message || e.message)
    }
  }

  return (
    <Dialog className="text-[#73879C]">
      <DialogTrigger asChild>
        <Button className="mx-8 my-8  bg-green-500 hover:bg-green-500 text-white hover:text-white" variant="outline">Thêm Lớp tín chỉ</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-[#2A3F54]">thêm lớp tín chỉ</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã Khoa" className="text-left text-[#2A3F54]">
              Mã Khoa
            </Label>
            <Label htmlFor="Mã Khoa" className="text-left text-[#2A3F54] col-span-3">
              {getItemFromLocalStorage('user[khoa]').data.MAKHOA}
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã sinh viên" className="text-left text-[#2A3F54]">
              Mã Lớp tín chỉ
            </Label>
            <Input placeholder="ex : LTC10" onChange={(e) => handleUpdateState(e.target.value, setMALTC)} id="Nhóm" value={MALTC} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã môn học" className="text-left text-[#2A3F54]">
              Mã môn học
            </Label>
            <select onChange={(e) => handleUpdateState(e.target.value, setMAMH)} id="countries" className="col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option hidden value="">*Chọn môn học</option>
              {
                listMH.map((item) => (
                  <option key={item.MAMH} value={item.MAMH}>
                    {item.MAMH}
                    {' '}
                    {item.TENMH}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã GV" className="text-left text-[#2A3F54]">
              Mã GV
            </Label>
            <select onChange={(e) => handleUpdateState(e.target.value, setMAGV)} id="countries" className="col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option hidden value="">*Chọn giảng viên</option>
              {
                listGV.map((item) => {
                  if (item.MAKHOA === getItemFromLocalStorage('user[khoa]').data.MAKHOA) {
                    return (
                      <option key={item.MAGV} value={item.MAGV}>
                        {item.MAGV}
                        {' '}
                        {item.HO}
                        {' '}
                        {item.TEN}
                      </option>
                    )
                  }
                  return null
                })
              }
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Nhóm" className="text-left text-[#2A3F54]">
              Nhóm
            </Label>
            <Input type="number" placeholder="ex : 1" onChange={(e) => handleUpdateState(parseInt(e.target.value, 10), setNHOM)} id="Nhóm" value={NHOM} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Sinh viên tối đa" className="text-left text-[#2A3F54]">
              Sinh viên tối đa
            </Label>
            <Input type="number" placeholder="tối thiểu 30 sinh viên" onChange={(e) => handleUpdateState(parseInt(e.target.value, 10), setSOSVTOITHIEU)} id="Sinh viên tối đa" value={SOSVTOITHIEU} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã lớp" className="text-left text-[#2A3F54]">
              Niên khóa
            </Label>
            <Input placeholder="ex : 2023 - 2024" onChange={(e) => handleUpdateState(e.target.value, setNIENKHOA)} id="Mã lớp" value={NIENKHOA} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã lớp" className="text-left text-[#2A3F54]">
              Học kỳ
            </Label>
            <Input type="number" placeholder="ex : HK 1" onChange={(e) => handleUpdateState(e.target.value, setHOCKY)} id="Mã lớp" value={HOCKY} className="col-span-3" />
          </div>
        </div>
        <div className="text-red-500 text-sm">
          (Thêm lớp tín chỉ thành công hệ thống sẽ delay 1-2 phút để cập nhật lại dữ liệu)
        </div>
        <DialogFooter>
          {error && <div className="text-red-500">{error}</div>}
          <Button onClick={handleSubmit} className="bg-green-600 MAGVver:bg-green-500" type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
