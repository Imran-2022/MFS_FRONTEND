import React from 'react'

const LoadingPage = () => {
  return (
    <div className="flex gap-3 justify-center items-center h-screen font-bold">
        <p className="text-cyan-700">Auth Checking ....</p>
        <div className="w-12 h-12 rounded-full animate-spin border-x-2 border-solid border-blue-500 border-t-transparent"></div>
    </div>
  )
}

export default LoadingPage
