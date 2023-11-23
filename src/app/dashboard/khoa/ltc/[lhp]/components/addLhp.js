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
export function AddLhp({ sv, lhp, data }) {
  const [error, setError] = React.useState('')
  const [MASV, setMASV] = React.useState('')
  const [MALHP, setMALHP] = React.useState(lhp)

  const handleUpdateState = (value, setFun) => {
    setFun(value)
    setError('')
  }

  const handleSubmit = async () => {
    const dataEdit = {
      MALTC: lhp,
      MASV,
    }
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/khoa/diem?khoa=${getItemFromLocalStorage('user[khoa]').data.MAKHOA}`, dataEdit)
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
        <Button className="mx-8 my-8  bg-green-500 hover:bg-green-500 text-white hover:text-white" variant="outline">Thêm sinh viên</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-[#2A3F54]">Thêm sinh viên vào lớp học phần</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã Khoa" className="text-left text-[#2A3F54]">
              Mã Lớp học phần
            </Label>
            <Label htmlFor="Mã Khoa" className="text-left text-[#2A3F54] col-span-3">
              {lhp}
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã GV" className="text-left text-[#2A3F54]">
              Sinh viên
            </Label>
            <select onChange={(e) => handleUpdateState(e.target.value, setMASV)} id="countries" className="col-span-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" selected>
                Chọn sinh viên
              </option>
              {
                sv.map((item) => {
                  if (data.find((i) => i.MASV === item.MASV)) {
                    return null
                  }
                  return (
                    <option key={item.MASV} value={item.MASV}>
                      {item.MASV}
                      {' '}
                      {item.HO}
                      {' '}
                      {item.TEN}
                    </option>
                  )
                })
              }
            </select>
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
