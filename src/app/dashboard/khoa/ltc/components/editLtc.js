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
export function EditLtc({ data, listGV }) {
  const [MALTC, setMALTC] = React.useState(data.MALTC)
  const [MAGV, setMAGV] = React.useState(data.MAGV)
  const [MAKHOA, setMAKHOA] = React.useState(data.MAKHOA)
  const [MAMH, setMAMH] = React.useState(data.MAMH)
  const [NHOM, setNHOM] = React.useState(data.NHOM)
  const [SOSVTOITHIEU, setSOSVTOITHIEU] = React.useState(data.SOSVTOITHIEU)
  const [NIENKHOA, setNIENKHOA] = React.useState(data.NIENKHOA)
  const [HOCKY, setHOCKY] = React.useState(data.HOCKY)

  const [error, setError] = React.useState('')

  const handleUpdateState = (value, setFun) => {
    setFun(value)
    setError('')
  }

  const handleSubmit = async () => {
    const dataEdit = {
      MAGV,
      MAKHOA,
      MAMH,
      NHOM,
      SOSVTOITHIEU,
      NIENKHOA,
      HOCKY,
    }
    try {
      const res = await axios.put(`http://localhost:8080/api/v1/khoa/ltc/${data.MALTC}`, dataEdit)
      alert('cập Lớp tín chỉ thành công')
      // reload lại trang
      window.location.reload()
    } catch (e) {
      setError(e.response.data.message || e.message)
    }
  }

  return (
    <Dialog className="text-[#73879C]">
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-500 text-white hover:text-white" variant="outline">Sửa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-[#2A3F54]">Sửa lớp tín chỉ</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã sinh viên" className="text-left text-[#2A3F54]">
              Mã Lớp tín chỉ
            </Label>
            <Label htmlFor="Mã sinh viên" className="text-left text-[#2A3F54] col-span-3">
              {MALTC}
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã môn học" className="text-left text-[#2A3F54]">
              Mã môn học
            </Label>
            <Label htmlFor="Mã môn học" className="text-left text-[#2A3F54] col-span-3">
              {MAMH}
              {' '}
              {data.TENMH}
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã Khoa" className="text-left text-[#2A3F54]">
              Mã Khoa
            </Label>
            <Label htmlFor="Mã Khoa" className="text-left text-[#2A3F54] col-span-3">
              {MAKHOA}
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã GV" className="text-left text-[#2A3F54]">
              Mã GV
            </Label>
            <select onChange={(e) => handleUpdateState(e.target.value, setMAGV)} id="countries" className="col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value={MAGV} selected>
                {data.MAGV}
                {' '}
                {data.HO}
                {' '}
                {data.TEN}
              </option>
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
            <Input type="number" onChange={(e) => handleUpdateState(parseInt(e.target.value, 10), setNHOM)} id="Nhóm" value={NHOM} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Sinh viên tối đa" className="text-left text-[#2A3F54]">
              Sinh viên tối đa
            </Label>
            <Input type="number" onChange={(e) => handleUpdateState(e.target.value, setSOSVTOITHIEU)} id="Sinh viên tối đa" value={SOSVTOITHIEU} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã lớp" className="text-left text-[#2A3F54]">
              Niên khóa
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setNIENKHOA)} id="Mã lớp" value={NIENKHOA} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã lớp" className="text-left text-[#2A3F54]">
              Học kỳ
            </Label>
            <Input type="number" onChange={(e) => handleUpdateState(e.target.value, setHOCKY)} id="Mã lớp" value={HOCKY} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          {error && <div className="text-red-500">{error}</div>}
          <Button onClick={handleSubmit} className="bg-green-600 MAGVver:bg-green-500" type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
