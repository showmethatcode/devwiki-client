import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'

const DetailTerm = () => {
  const [users, setUsers] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        setUsers(response.data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  if (!users) return null
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.username} ({user.name})
        </li>
      ))}
    </ul>
  )
}

export default DetailTerm
