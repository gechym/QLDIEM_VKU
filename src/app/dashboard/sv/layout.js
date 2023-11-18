'use client'

import React from 'react'
import { checkItemInLocalStorage, getItemFromLocalStorage } from '~/utils/localStorage'
import '~/app/globals.css'

const layout = ({ children }) => {
  const getUserFromLocalStorage = () => {
    if (checkItemInLocalStorage('user[sv]')) {
      const user = getItemFromLocalStorage('user[sv]').data
      return `[Sinh viên] ${user.HO} ${user.TEN} - ${user.MASV}`
    }
    if (checkItemInLocalStorage('user[gv]')) {
      const user = getItemFromLocalStorage('user[gv]').data
      return `[Giáo viên] ${user.HO} ${user.TEN}`
    }
    if (checkItemInLocalStorage('user[khoa]')) {
      return getItemFromLocalStorage('user[khoa]').data.TENKHOA
    }
    return null
  }

  return (

    <div className="text-[#73879C] bg-[#F7F7F7]">
      <div className="bg-[#EDEDED] flex flex-row justify-end items-center h-[57px] w-full">
        <p className="text-md mr-5 text-center">
          {getUserFromLocalStorage()}
        </p>
        {/* Btn logout */}
        <button
          type="button"
          className="bg-[#405467] text-sm text-white px-4 py-2 rounded-lg mr-5"
          onClick={() => {
            localStorage.clear()
            window.location.reload()
          }}
        >
          Đăng xuất
        </button>
      </div>
      <div className="my-3">
        {children}
      </div>
    </div>
  )
}

export default layout
