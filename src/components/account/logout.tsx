'use client'

import { FC } from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'


const LogoutButton: FC = () => {
  return (
    <Button size="lg"  onClick={() => signOut()}>
    Logout
  </Button>
  )
}

export default LogoutButton