import React from 'react'

function TableLayout({ data , title }) {
  console.log(data)
  const chuyenDoiDiem10SangChu = (diemThang10) => {
    if (diemThang10 >= 8.5 && diemThang10 <= 10) {
      return 'A'
    } if (diemThang10 >= 7.0 && diemThang10 < 8.5) {
      return 'B'
    } if (diemThang10 >= 5.5 && diemThang10 < 7.0) {
      return 'C'
    } if (diemThang10 >= 4.0 && diemThang10 < 5.5) {
      return 'D'
    }
    return 'F'
  }

  return (
    <div>
      <div>
        <p className="text-center text-lg pb-2">{title}</p>
        <div className="shadow-lg rounded-lg overflow-hidden mx-2 md:mx-5">
          <table className="w-full table-fixed">

            <thead>
              <tr className="bg-[#405467]">
                <th className="w-1/2 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Tên lớp học phần</th>
                <th className="w-1/4 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Số TC</th>
                <th className="w-1/4 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Điểm CC / GVHD</th>
                <th className="w-1/4 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Điểm Bài tập</th>
                <th className="w-1/4 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Điểm Giữa kỳ</th>
                <th className="w-1/3 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Điểm Cuối kỳ / Đồ Án</th>
                <th className="w-1/4 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Điểm T10</th>
                <th className="w-1/4 py-4 px-4 text-left text-[#ECF0F1] font-bold text-[11px] uppercase">Điểm Chữ</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {
                data.map((item, index) => (
                  <tr key={item.TENMH}>
                    <td className="py-2 px-6 border-b border-gray-200">{item.TENMH}</td>
                    <td className="py-2 px-6 border-b border-gray-200">{item.TINCHI}</td>
                    <td className="py-2 px-6 border-b border-gray-200">{item.DIEM_CC}</td>
                    <td className="py-2 px-6 border-b border-gray-200">{item.DIEM_BT === 0 ? '-' : item.DIEM_BT}</td>
                    <td className="py-2 px-6 border-b border-gray-200">{item.DIEM_GK}</td>
                    <td className="py-2 px-6 border-b border-gray-200">{item.DIEM_CK}</td>
                    <td className="py-2 px-6 border-b border-gray-200">{item.DIEM_T10}</td>
                    <td className="py-2 px-6 border-b border-gray-200">{chuyenDoiDiem10SangChu(item.DIEM_T10)}</td>
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
