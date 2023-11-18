'use client'

/* eslint-disable import/prefer-default-export */
export const setItemOnLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getItemFromLocalStorage = (key) => {
  const features = localStorage.getItem(key)
  return JSON.parse(features)
}

export const removeItemFromLocalStorage = (key) => {
  localStorage.removeItem(key)
}

export const checkItemInLocalStorage = (key) => localStorage.getItem(key) !== null
