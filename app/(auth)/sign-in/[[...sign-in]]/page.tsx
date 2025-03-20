import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <main className='auth-page w-screen h-screen flex justify-center items-center bg-[#1e1b22]'>
        <SignIn/>
    </main>
  )
}

export default SignInPage
