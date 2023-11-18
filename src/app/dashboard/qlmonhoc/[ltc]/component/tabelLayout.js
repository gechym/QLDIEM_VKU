'use client'

import React from 'react'
import EditDiem from './editDiem'

function TableLayout({
  data, title, handleUpdateData, params, 
}) {
  return (
    <div>
      <div>
        <p className="text-center text-lg pb-2">{title}</p>
        <div className="shadow-lg rounded-lg overflow-hidden mx-2 md:mx-5">
          <table className="w-full table-fixed">

            <thead>
              <tr className="bg-[#405467]">
                <th className="w-1/2 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Tên Sinh viên</th>
                <th className="w-1/4 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Điểm CC / GVHD</th>
                <th className="w-1/4 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Điểm Bài tập</th>
                <th className="w-1/4 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Điểm Giữa kỳ</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Điểm Cuối kỳ / Đồ Án</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Chức năng</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {
                data.map((item, index) => (
                  <tr key={`${item.HO} ${item.TEN}`}>
                    <td className="py-2 px-6 border-b border-gray-200">{`${item.HO} ${item.TEN}`}</td>
                    <td className="py-2 px-6 border-b border-gray-200">{item.DIEM_CC}</td>
                    <td className="py-2 px-6 border-b border-gray-200">{item.DIEM_BT === 0 ? '-' : item.DIEM_BT}</td>
                    <td className="py-2 px-6 border-b border-gray-200">{item.DIEM_GK}</td>
                    <td className="py-2 px-6 border-b border-gray-200">{item.DIEM_CK}</td>
                    <td className="py-2 px-6 border-b border-gray-200">
                      {/* Button edit  */}
                      <EditDiem
                        data={item}
                        index={index}
                        handleUpdateData={handleUpdateData}
                        params={params}
                      />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TableLayout
