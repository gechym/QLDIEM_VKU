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
export function EditLop({ data }) {
  //
  const [MALOP, setMALOP] = React.useState(data.MALOP)
  const [TENLOP, setTENLOP] = React.useState(data.TENLOP)
  const [KHOAHOC, setKHOAHOC] = React.useState(data.KHOAHOC)
  const [MAKHOA, setMAKHOA] = React.useState(data.MAKHOA)
  const [error, setError] = React.useState('')

  const handleUpdateState = (value, setFun) => {
    setFun(value)
    setError('')
  }

  const handleSubmit = async () => {
    const dataEdit = {
      TENLOP,
      KHOAHOC,
      MAKHOA,
    }
    console.log(dataEdit)
    try {
      const res = await axios.put(`http://localhost:8080/api/v1/khoa/lop/${data.MALOP}?khoa=${getItemFromLocalStorage('user[khoa]').data.MAKHOA}`, dataEdit)
      console.log(res.data.data)
      alert('Cập nhật lớp thành công')
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
          <DialogTitle className="text-[#2A3F54]">Sửa Lớp học</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Ma lớp học" className="text-right text-[#2A3F54]">
              Mã lớp học
            </Label>
            <Input id="Mã lớp học" value={MALOP} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Tên Lớp" className="text-right text-[#2A3F54]">
              Tên Lớp
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setTENLOP)} id="Tên Lớp" value={TENLOP} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Khóa học" className="text-right text-[#2A3F54]">
              Khóa học
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setKHOAHOC)} id="Khóa học" value={KHOAHOC} className="col-span-3" />
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
