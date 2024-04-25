import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/auth';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const auth = request?.headers.get('authorization') as string;
  const token = auth?.split('Bearer ').at(1) as string;

  let error_response = {
    status: 'FAILED',
    message: 'Internal Server Error.',
  };

  if (!id || id !== '1234') {
    error_response = {
      status: 'FAILED',
      message: 'No Response.Test not found.',
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!verifyToken(token)) {
    error_response = {
      status: 'UNAUTHORIZED',
      message: 'Unauthorized',
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  try {
    const json_response = {
      status: 'success',
      results: {
        testid: '1234',
        teststatus: 'TODO',
        questions: [
          {
            no: '1',
            question: 'This is an example question which re',
            response_type: 'text',
            choices: '',
          },
          {
            no: '2',
            question: 'This is multiple choice example ques',
            response_type: 'choice',
            choices: 'A|B|C|D',
          },
          {
            no: '3',
            question: 'Which company logo is correct?',
            response_type: 'fileChoice',
            urlFile: 'https://i.pinimg.com/564x/e8/75/34/e87534bb49eb7e841e6e5e8ef0b47e25.jpg',
            choices: 'A.Ferari|B.Lamborgini|C.Ducati|D.Toyota',
          },
          {
            no: '4',
            question: 'Which company logo is correct?',
            response_type: 'fileText',
            urlFile: 'https://i.pinimg.com/564x/e8/75/34/e87534bb49eb7e841e6e5e8ef0b47e25.jpg',
            choices: 'A.Ferari|B.Lamborgini|C.Ducati|D.Toyota',
          },
        ],
      },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    error_response = {
      status: 'FAILED',
      message: 'Internal Server Error.',
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req: any) {
  const auth = req?.headers.get('authorization') as string;
  const token = auth?.split('Bearer ').at(1) as string;
  let error_response = {
    status: 'UNAUTHORIZED',
    message: 'Unauthorized',
  };
  if (!verifyToken(token)) {
    error_response = {
      status: 'UNAUTHORIZED',
      message: 'Unauthorized',
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const userData = verifyToken(token);
  return new NextResponse(JSON.stringify(userData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
