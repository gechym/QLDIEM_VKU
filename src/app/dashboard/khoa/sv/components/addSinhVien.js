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
export function AddSinhVien({ lop }) {
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
      MASV: `${MASV}-${Date.now()}`,
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
      const res = await axios.post(`http://localhost:8080/api/v1/khoa/sv?khoa=${getItemFromLocalStorage('user[khoa]').data.MAKHOA}`, data)
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
            <Label htmlFor="Mã sinh viên" className="text-left text-[#2A3F54]">
              Mã sinh viên
            </Label>
            <Input placeholder="20IT123" onChange={(e) => handleUpdateState(e.target.value.toUpperCase(), setMASV)} id="Mã sinh viên" value={MASV} className="col-span-3" />
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
            <Label htmlFor="Giới tính" className="text-left text-[#2A3F54]">
              Giới tính
            </Label>
            <Input placeholder="Nam" onChange={(e) => handleUpdateState(e.target.value, setGIOITINH)} id="Giới tính" value={GIOITINH} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Địa chỉ" className="text-left text-[#2A3F54]">
              Địa chỉ
            </Label>
            <Input placeholder="470 Trần Đại Nghĩa" onChange={(e) => handleUpdateState(e.target.value, setDIACHI)} id="Địa chỉ" value={DIACHI} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Ngày sinh" className="text-left text-[#2A3F54]">
              Ngày sinh
            </Label>
            <Input placeholder="20-11-2002" onChange={(e) => handleUpdateState(e.target.value, setNGAYSINH)} id="Ngày sinh" value={NGAYSINH} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã lớp" className="text-left text-[#2A3F54]">
              Mã lớp
            </Label>
            <select onChange={(e) => handleUpdateState(e.target.value, setMALOP)} id="countries" className="col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" selected>
                Chọn lớp học
              </option>
              {
                lop.map((item) => (
                  <option key={item.MALOP} value={item.MALOP}>
                    {item.MALOP}
                    {' '}
                    {item.TENLOP}
                  </option>
                ))
              }
            </select>
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
