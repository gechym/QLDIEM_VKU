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
export function AddGiangVien() {
  //
  const [MAGV, setMAGV] = React.useState('')
  const [HO, setHO] = React.useState('')
  const [TEN, setTEN] = React.useState()
  const [MAKHOA, setMAKHOA] = React.useState(getItemFromLocalStorage('user[khoa]').data.MAKHOA)
  const [HOCVI, setHOCVI] = React.useState()
  const [EMAIL, setEMAIL] = React.useState()

  const [error, setError] = React.useState('')

  const handleUpdateState = (value, setFun) => {
    setFun(value)
    setError('')
  }
  const handleSubmit = async () => {
    const data = {
      MAGV: `${MAGV}-${Date.now()}`,
      HO,
      TEN,
      MAKHOA,
      HOCVI,
      CHUYENMON: 'Thạc sĩ',
      HOCHAM: 'Thạc sĩ',
      EMAIL,
      PASSWORD: '123',
    }
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/khoa/gv?khoa=${getItemFromLocalStorage('user[khoa]').data.MAKHOA}`, data)
      console.log(res.data.data)
      alert('Thêm giảng viên thành công')
      // reload lại trang
      window.location.reload()
    } catch (e) {
      setError(e.response.data.message || e.message)
    }
  }

  return (
    <Dialog className="text-[#73879C]">
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-500 text-white hover:text-white" variant="outline">Thêm Giảng Viên</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-[#2A3F54]">Thêm Giảng Viên</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã giảng viên" className="text-left text-[#2A3F54]">
              Mã giảng viên
            </Label>
            <Input placeholder="GV1" onChange={(e) => handleUpdateState(e.target.value.toUpperCase(), setMAGV)} id="Mã sinh viên" value={MAGV} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Họ" className="text-left text-[#2A3F54]">
              Họ
            </Label>
            <Input placeholder="Nguyễn" onChange={(e) => handleUpdateState(e.target.value, setHO)} id="Họ" value={HO} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Tên" className="text-left text-[#2A3F54]">
              Tên
            </Label>
            <Input placeholder="Văn A" onChange={(e) => handleUpdateState(e.target.value, setTEN)} id="Tên" value={TEN} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Học vị" className="text-left text-[#2A3F54]">
              Học vị
            </Label>
            <Input placeholder="Thạc sĩ" onChange={(e) => handleUpdateState(e.target.value, setHOCVI)} id="Học vị" value={HOCVI} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Email" className="text-left text-[#2A3F54]">
              Email
            </Label>
            <Input placeholder="ndbao.20it6@vku.udn.vn" onChange={(e) => handleUpdateState(e.target.value, setEMAIL)} id="Email" value={EMAIL} className="col-span-3" />
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
