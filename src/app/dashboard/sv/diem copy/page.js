'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TableLayout from '~/app/dashboard/sv/diem/component/tabelLayout'
import { getItemFromLocalStorage } from '~/utils/localStorage'

function Page() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/sinhvien/${getItemFromLocalStorage('user[sv]').data.MASV}`)
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
      {
        Object.keys(data).map((item) => (
          <TableLayout key={item} data={data[item]} title={item} />
        ))
      }
    </div>
  )
}

export default Page
