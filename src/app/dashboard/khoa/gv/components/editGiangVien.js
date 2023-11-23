'use client'

import React from 'react'
import axios from 'axios'
import { Button } from '~/app/components/ui/button'
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
import { getItemFromLocalStorage } from '~/utils/localStorage'

// eslint-disable-next-line import/prefer-default-export
export function EditGiangVien({ data }) {
  //
  const [MAGV, setMAGV] = React.useState(data.MAGV)
  const [HO, setHO] = React.useState(data.HO)
  const [TEN, setTEN] = React.useState(data.TEN)
  const [EMAIL, setEMAIL] = React.useState(data.EMAIL)
  const [HOCVI, setHOCVI] = React.useState(data.HOCVI)
  const [error, setError] = React.useState('')

  const handleUpdateState = (value, setFun) => {
    setFun(value)
    setError('')
  }

  const handleSubmit = async () => {
    const dataEdit = {
      MAKHOA: getItemFromLocalStorage('user[khoa]').data.MAKHOA,
      HO,
      TEN,
      HOCVI,
      HOCHAM: 'Thạc sĩ',
      CHUYENMON: 'Thạc sĩ',
      PASSWORD: '123',
      EMAIL,
    }
    console.log(dataEdit)
    try {
      const res = await axios.put(`http://localhost:8080/api/v1/khoa/gv/${data.MAGV}?khoa=${getItemFromLocalStorage('user[khoa]').data.MAKHOA}`, dataEdit)
      console.log(res.data.data)
      alert('Cập nhật Giảng viên thành công')
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
          <DialogTitle className="text-[#2A3F54]">Sữa giảng viên</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã giảng viên" className="text-right text-[#2A3F54]">
              Mã giảng viên
            </Label>
            <Input id="Mã giảng viên" value={MAGV} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Họ" className="text-right text-[#2A3F54]">
              Họ
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setHO)} id="Họ" value={HO} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Tên" className="text-right text-[#2A3F54]">
              Tên
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setTEN)} id="Tên" value={TEN} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Học vị" className="text-right text-[#2A3F54]">
              Học vị
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setHOCVI)} id="Học vị" value={HOCVI} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Email" className="text-right text-[#2A3F54]">
              Email
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setEMAIL)} id="Email" value={EMAIL} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          {error && <div className="text-red-500">{error}</div>}
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-500" type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
