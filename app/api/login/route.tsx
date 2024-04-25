// pages/api/login.ts

import { NextResponse } from 'next/server';
import { authenticateUser } from '@/auth';

const userData = [
  {
    token: '112244',
    id: '1234',
  },
];

export async function POST(req: any) {
  const body = await req.json();
  const getUserData: boolean = !!userData.find(
    (item) => item?.token === body?.token && item?.id === body?.id
  );
  if (getUserData) {
    const token = await authenticateUser(body);

    return new NextResponse(
      JSON.stringify({
        status: 'SUCCESS',
        now: Date.now(),
        token: `${token}`,
        data: body,
        code: 200,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return new NextResponse(
    JSON.stringify({
      status: 'UNAUTHORIZED',
      message: 'Unauthorized',
      code: 401,
    }),
    {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
