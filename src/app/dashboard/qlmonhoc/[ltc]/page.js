'use client'

import axios from 'axios'
import React, { useState, useEffect } from 'react'
import TableLayout from './component/tabelLayout'

export default function Page({ params: { ltc } }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [tenMonHoc, setTenMonHoc] = useState('')

  const handleUpdateData = (value, index) => {
    setData((prev) => {
      const newData = prev.map((item, i) => {
        if (i === index) {
          return { ...item, ...value }
        }
        return item
      })

      return newData
    })
  }

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/giangvien/get-sv-by-hoc-phan/${ltc}`)
        const des = await axios.get(`http://localhost:8080/api/v1/giangvien/get-ten-hoc-phan/${ltc}`)
        setTenMonHoc(des.data.data[0])
        setData(res.data.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    getData()
  }, [])

  return (
    <div>

      <div className="ml-10 ">
        <p className="font-bold text-lg">
          Thông tin lớp học phần
        </p>
        <div className="flex">
          <div className>
            <p>
              Mã lớp tín chỉ:
              {' '}
              {tenMonHoc.MALTC}
            </p>
            <p>
              Niên khóa:
              {' '}
              {tenMonHoc.NIENKHOA}
            </p>
            <p>
              Học kỳ:
              {' '}
              {tenMonHoc.HOCKY}
            </p>
            <p>
              Mã khoa:
              {' '}
              {tenMonHoc.MAKHOA}
            </p>
            <p>
              Tên môn học:
              {' '}
              {tenMonHoc.TENMH}
            </p>
            <p>
              Số lượng sv đang học:
              {' '}
              {data.length}
              {' '}
              /
              {' '}
              {`${tenMonHoc.SOSVTOITHIEU}`}
            </p>
            <p>
              Tín chỉ:
              {' '}
              {tenMonHoc.TINCHI}
            </p>
          </div>
          <div className="ml-20">

            <p>
              Số tiết lý thuyết:
              {' '}
              {tenMonHoc.SOTIET_LT}
            </p>
            <p>
              Số tiết thực hành:
              {' '}
              {tenMonHoc.SOTIET_TH}
            </p>
            <p>
              Hệ số chuyên cần:
              {' '}
              {tenMonHoc.HESO_CC}
            </p>
            <p>
              Hệ số bài tập:
              {' '}
              {tenMonHoc.HESO_BT}
            </p>
            <p>
              Hệ số giữa kỳ:
              {' '}
              {tenMonHoc.HESO_GK}
            </p>
            <p>
              Hệ số cuối kỳ:
              {' '}
              {tenMonHoc.HESO_CK}
            </p>
          </div>
        </div>
      </div>
      <TableLayout
        data={data}
        handleUpdateData={handleUpdateData}
        params={ltc}
      />
    </div>
  )
}
