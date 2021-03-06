import { API_URL } from '@/config/index';
import cookie from 'cookie';

export default async (req, res) => {
  if(req.method === 'POST') {
    const { identifier, password } = req.body;

    const strapiRes = await fetch(`${API_URL}/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });

    const { jwt, user, message } = await strapiRes.json();
    
    if(strapiRes.ok) {
      res.setHeader('Set-Cookie', cookie.serialize('token', jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'strict',
        path: '/'
      }))

      res.status(200).json({ user });
    } else {
      res.status(strapiRes.status).json({ message: message[0].messages[0].message })
    }

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed!` });
  }
}