'use client'

import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setItemOnLocalStorage, removeItemFromLocalStorage } from '~/utils/localStorage'

function Page() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [load, setLoad] = useState(false)
  const [error, setError] = useState(true)

  const handleOnclick = async () => {
    setLoad(true)
    setError('')
    localStorage.clear()
    try {
      const resquest = await axios.post('http://localhost:8080/api/v1/auth/khoa', {
        email,
        password,
      })
      setLoad(false)
      // xử lý lưu user ở đâu đó rồi
      setItemOnLocalStorage('user[khoa]', resquest.data)
      // chuyển trang
      router.push('/dashboard/diem', { replace: true })
    } catch (e) {
      setError(e.response.data.message || e.message)
      setLoad(false)
    }
  }

  return (
    <div className="justify-center items-center w-full shadow rounded-lg bg-white px-6 flex flex-col md:w-1/2 lg:w-1/3 m-auto">
      <h2 className="text-2xl my-4">Đăng nhập[khoa]</h2>
      <div className="w-full p-2 justify-start flex flex-col">
        <div className=" flex flex-row">
          <span className="z-highest rounded-l-lg w-10 h-10 flex justify-center items-center text-2xl text-gray-400 border border-r-0" mode="render" block="">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
          </span>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            className="border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-[#5CB85C] w-full pl-1"
            placeholder="email"
          />
        </div>
        <div className="my-4 flex flex-row">
          <span className="z-highest rounded-l-lg w-10 h-10 flex justify-center items-center text-2xl text-gray-400 border border-r-0" mode="render" block="">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
          </span>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-[#5CB85C] w-full pl-1"
            placeholder="password"
          />
        </div>
        <button
          onClick={handleOnclick}
          type="button"
          value="button"
          disabled={load}
          className="px-4 py-2 rounded bg-[#5CB85C] text-white my-4 w-full"
        >
          {load ? 'loading...' : 'login'}
        </button>
        <span>{error}</span>
      </div>
    </div>
  )
}

export default Page
