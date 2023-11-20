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

// eslint-disable-next-line import/prefer-default-export
export function AddSinhVien() {
  //
  const [MASV, setMASV] = React.useState('')
  const [HO, setHO] = React.useState('')
  const [TEN, setTEN] = React.useState()
  const [GIOITINH, setGIOITINH] = React.useState()
  const [DIACHI, setDIACHI] = React.useState()
  const [NGAYSINH, setNGAYSINH] = React.useState()
  const [MALOP, setMALOP] = React.useState()
  const [THOIHOC, setTHOIHOC] = React.useState()
  const [EMAIL, setEMAIL] = React.useState()

  const [error, setError] = React.useState('')

  const handleUpdateState = (value, setFun) => {
    setFun(value)
    setError('')
  }
  const handleSubmit = async () => {
    const data = {
      MASV,
      HO,
      TEN,
      GIOITINH,
      DIACHI,
      NGAYSINH,
      MALOP,
      EMAIL,
      PASSWORD: '123',
    }
    console.log(data)
    try {
      const res = await axios.post('http://localhost:8080/api/v1/khoa/sv', data)
      console.log(res.data.data)
      alert('Thêm sinh viên thành công')
      // reload lại trang
      window.location.reload()
    } catch (e) {
      setError(e.response.data.message || e.message)
    }
  }

  return (
    <Dialog className="text-[#73879C]">
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-500 text-white hover:text-white" variant="outline">Thêm sinh viên</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-[#2A3F54]">Thêm sinh viên</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã sinh viên" className="text-right text-[#2A3F54]">
              Mã sinh viên
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value.toUpperCase(), setMASV)} id="Mã sinh viên" value={MASV} className="col-span-3" />
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
            <Label htmlFor="Giới tính" className="text-right text-[#2A3F54]">
              Giới tính
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setGIOITINH)} id="Giới tính" value={GIOITINH} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Địa chỉ" className="text-right text-[#2A3F54]">
              Địa chỉ
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setDIACHI)} id="Địa chỉ" value={DIACHI} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Ngày sinh" className="text-right text-[#2A3F54]">
              Ngày sinh
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setNGAYSINH)} id="Ngày sinh" value={NGAYSINH} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã lớp" className="text-right text-[#2A3F54]">
              Mã lớp
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setMALOP)} id="Mã lớp" value={MALOP} className="col-span-3" />
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