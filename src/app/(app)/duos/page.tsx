import React from 'react'
import DuosClient from './DuosClient'
import CustomHeader from '@/components/header-footers/CustomHeader'

export default function page() {
  return (
    <div>
      <CustomHeader/>
      <DuosClient/>
    </div>
  )
}
