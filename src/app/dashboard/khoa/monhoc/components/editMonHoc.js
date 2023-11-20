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
export function EditMonHoc({ data }) {
  const [mamh, setMamh] = React.useState(data.MAMH)
  const [tenmh, setTenmh] = React.useState(data.TENMH)
  const [sotc, setSotc] = React.useState(data.TINCHI)
  const [solt, setSolt] = React.useState(data.SOTIET_LT)
  const [soth, setSoth] = React.useState(data.SOTIET_TH)
  const [hesoCC, setHesoCC] = React.useState(data.HESO_CC)
  const [hesoBT, setHesoBT] = React.useState(data.HESO_BT)
  const [hesoGK, setHesoGK] = React.useState(data.HESO_GK)
  const [hesoCK, setHesoCK] = React.useState(data.HESO_CK)

  const [error, setError] = React.useState('')

  const handleUpdateState = (value, setFun) => {
    setFun(value)
    setError('')
  }
  const handleSubmit = async () => {
    const dataedit = {
      MAMH: mamh,
      TENMH: tenmh,
      TINCHI: Number(sotc),
      SOTIET_LT: Number(solt),
      SOTIET_TH: Number(soth),
      HESO_CC: parseFloat(hesoCC),
      HESO_BT: parseFloat(hesoBT),
      HESO_GK: parseFloat(hesoGK),
      HESO_CK: parseFloat(hesoCK),
    }
    console.log(dataedit)
    try {
      const res = await axios.put(`http://localhost:8080/api/v1/khoa/monhoc/${mamh}`, dataedit)
      console.log(res.data.data)
      alert('Cập nhật môn học thành công')
      // reload lại trang
      window.location.reload()
    } catch (e) {
      setError(e.response.data.message || e.message)
    }
  }

  return (
    <Dialog className="text-[#73879C]">
      <DialogTrigger asChild>
        <Button variant="outline" className="w-[60px] h-[40px] bg-yellow-400 hover:bg-yellow-400 hover:text-white text-white">Sửa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-[#2A3F54]">Cập nhật Môn học</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Mã Môn Học" className="text-right text-[#2A3F54]">
              Mã môn học
            </Label>
            <Input id="Mã Môn Học" value={mamh} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-[#2A3F54]">
              Tên môn học
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setTenmh)} id="name" value={tenmh} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right text-[#2A3F54]">
              số tín chỉ
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setSotc)} type="number" id="username" value={sotc} className="col-span-3 text-[#2A3F54]" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-[#2A3F54]">
              Số tiết lý thuyết
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setSolt)} id="name" type="number" value={solt} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-[#2A3F54]">
              Số tiết thực hành
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setSoth)} id="name" type="number" value={soth} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-[#2A3F54]">
              Hệ số chuyên cần
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setHesoCC)} id="name" type="number" value={hesoCC} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-[#2A3F54]">
              Hệ số bài tập
            </Label>
            <Input id="name" onChange={(e) => handleUpdateState(e.target.value, setHesoBT)} value={hesoBT} type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-[#2A3F54]">
              Hệ số giữa kỳ
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setHesoGK)} id="name" value={hesoGK} type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-[#2A3F54]">
              Hệ số cuối kỳ
            </Label>
            <Input onChange={(e) => handleUpdateState(e.target.value, setHesoCK)} id="name" value={hesoCK} type="number" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          {error && <div className="text-red-500">{error}</div>}
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-500" type="submit">Cập nhật</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
