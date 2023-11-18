import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/app/components/ui/dialog'
import { Input } from '~/app/components/ui/input'

export default function EditDiem({
  data, index, handleUpdateData, params,
}) {
  const [diemCC, setDiemCC] = React.useState(data.DIEM_CC)
  const [diemBT, setDiemBT] = React.useState(data.DIEM_BT)
  const [diemGK, setDiemGK] = React.useState(data.DIEM_GK)
  const [diemCK, setDiemCK] = React.useState(data.DIEM_CK)

  const [open, setOpen] = React.useState(false)
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleUpdateState = (value, setFun) => {
    setError('')
    setFun(value)
  }

  const handleEditAPI = async () => {
    const newData = {
      ...data,
      DIEM_CC: parseFloat(diemCC),
      DIEM_BT: parseFloat(diemBT),
      DIEM_GK: parseFloat(diemGK),
      DIEM_CK: parseFloat(diemCK),
    }

    try {
      const res = await axios.post('http://localhost:8080/api/v1/giangvien/update-diem-sv', {
        DIEM_CC: newData.DIEM_CC,
        DIEM_BT: newData.DIEM_BT,
        DIEM_GK: newData.DIEM_GK,
        DIEM_CK: newData.DIEM_CK,
        MALTC: params,
        MASV: newData.MASV,
      })
      handleUpdateData(newData, index)
      setOpen(false)
      alert('Cập nhật điểm thành công')
    } catch (e) {
      setError(e.response.data.message || e.message)
    }
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
        >
          Sửa
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-[#405467]">Chỉnh sửa điểm sinh viên</DialogTitle>
          <DialogDescription>
            Hệ thống sẽ cập nhật delay (~1p) trong quá trình cập nhật
          </DialogDescription>
        </DialogHeader>
        <div className="py-2 text-[#58585d]">
          <div className="items-center text-[#58585d]">
            {`Sinh viên : ${data.HO} ${data.TEN}`}
          </div>
          <div className="items-center text-[#58585d]">
            {`Mã sinh viên : ${data.MASV}`}
          </div>
          <div>
            <div className="">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="bg-[#405467]">
                    <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">
                      Điểm CC / GVHD (
                      {`${data.DIEM_CC}`}
                      )
                    </th>
                    {
                      data.DIEM_BT === 0 ? '' : (
                        <th className="w-1/4 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">
                          Điểm Bài tập
                          {' '}
                          {`${data.DIEM_BT}`}
                        </th>
                      )
                    }
                    <th className="w-1/4 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">
                      Điểm Giữa kỳ
                      {' '}
                      {`${data.DIEM_GK}`}
                    </th>
                    <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">
                      Điểm Cuối kỳ / Đồ Án
                      {' '}
                      {`${data.DIEM_CK}`}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <td className="py-2 px-6 border-b border-gray-200">

                    <Input
                      onChange={(e) => handleUpdateState(e.target.value, setDiemCC)}
                      value={diemCC}
                      type="number"
                      placeholder="Chuyên cần"
                    />
                  </td>
                  {
                    data.DIEM_BT === 0 ? '' : (
                      <td className="py-2 px-6 border-b border-gray-200">
                        <Input
                          onChange={(e) => handleUpdateState(e.target.value, setDiemBT)}
                          value={diemBT}
                          type="number"
                          placeholder="Bài tập"
                        />
                      </td>
                    )
                  }
                  <td className="py-2 px-6 border-b border-gray-200">
                    <Input
                      onChange={(e) => handleUpdateState(e.target.value, setDiemGK)}
                      value={diemGK}
                      type="number"
                      placeholder="Giữa kỳ"
                    />
                  </td>
                  <td className="py-2 px-6 border-b border-gray-200">
                    <Input
                      onChange={(e) => handleUpdateState(e.target.value, setDiemCK)}
                      value={diemCK}
                      type="number"
                      placeholder="Cuối kỳ"
                    />
                  </td>
                </tbody>
              </table>
            </div>
            {/* css error line */}
            <p className="">{error}</p>
          </div>
        </div>
        <DialogFooter>
          <button
            onClick={() => setOpen(false)}
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Hủy
          </button>
          <button
            onClick={handleEditAPI}
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
          >
            Lưu thay đổi
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
