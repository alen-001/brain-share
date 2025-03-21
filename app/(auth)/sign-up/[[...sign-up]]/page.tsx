import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <main className='auth-page w-screen h-screen flex justify-center items-center bg-[#1e1b22]'>
        <SignUp/>
    </main>
  )
}

export default SignUpPage