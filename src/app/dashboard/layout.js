'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { checkItemInLocalStorage, getItemFromLocalStorage } from '~/utils/localStorage'
import '~/app/globals.css'
// eslint-disable-next-line import/order
import { AvatarIcon, BookmarkFilledIcon } from '@radix-ui/react-icons'

function Layout({ children }) {
  const router = useRouter()
  const getUserFromLocalStorage = () => {
    if (checkItemInLocalStorage('user[sv]')) {
      const user = getItemFromLocalStorage('user[sv]')?.data
      return `[Sinh viên] ${user.HO} ${user.TEN} - ${user.MASV}`
    }
    if (checkItemInLocalStorage('user[gv]')) {
      const user = getItemFromLocalStorage('user[gv]').data
      return `[Giáo viên] ${user.HO} ${user.TEN}`
    }
    if (checkItemInLocalStorage('user[khoa]')) {
      return getItemFromLocalStorage('user[khoa]')?.data.TENKHOA
    }
    return null
  }

  const renderMenuByRole = () => {
    if (checkItemInLocalStorage('user[sv]')) {
      return (
        <div className="mt-5">
          <p className="text-md">Sinh viên</p>
          <ul className="">
            <li className="pl-5 text-sm py-2 hover:bg-[#405467] cursor-pointer">
              <Link className="flex" href="/dashboard/sv/">
                <AvatarIcon className="w-5 h-5 mr-2" />
                Thông tin sinh viên
              </Link>
            </li>
            <li className="pl-5 text-sm py-2 hover:bg-[#405467] cursor-pointer">
              <Link className="flex" href="/dashboard/sv/diem">
                <BookmarkFilledIcon className="w-5 h-5 mr-2" />
                Bảng điểm
              </Link>
            </li>
          </ul>
        </div>
      )
    }

    if (checkItemInLocalStorage('user[gv]')) {
      return (
        <div className="mt-5">
          <p className="text-md">Giáo viên</p>
          <ul className="">
            <li className="">
              <Link className="pl-5 text-sm py-2 hover:bg-[#405467] cursor-pointer" href="/dashboard/qlmonhoc">
                Lớp học phần Đang giảng dạy
              </Link>
            </li>
            <li className="pl-5 text-sm py-2 hover:bg-[#405467] cursor-pointer">Thông tin cá nhân</li>
          </ul>
        </div>
      )
    }
    return null
  }

  if (!getUserFromLocalStorage()) {
    router.push('/login')
  } else {
    return (
      <div className="flex text-white">
        <div className="w-[230px] pt-[20px] h-screen bg-[#2A3F54]">
          <p className="text-white text-3xl text-center"> VKU!</p>
          <p className="text-center text-md">Hệ thống quản lý đào tạo</p>
          {
            renderMenuByRole()
          }
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    )
  }
}

export default Layout
