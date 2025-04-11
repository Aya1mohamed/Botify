import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'temporary_dev_secret' 
// POST /api/login
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password } = body

  // Simulate stored user data from DB or localStorage
  const storedUser = {
    email: 'test@example.com',
    password: '123456',
    firstName: 'Bot',
    lastName: 'User',
    phone: '123-456-7890'
  }

  if (email === storedUser.email && password === storedUser.password) {
    const token = jwt.sign(
      {
        email: storedUser.email,
        name: `${storedUser.firstName} ${storedUser.lastName}`,
        phone: storedUser.phone,
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    )

    return NextResponse.json({ token }, { status: 200 })
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}
