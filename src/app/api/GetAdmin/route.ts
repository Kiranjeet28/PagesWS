import { serialize } from 'cookie';
import AdminModel from "@/Model/Admin";
import dbConnect from '@/DB/dbConnet';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();
    const existingAdmin = await AdminModel.findOne({ email });

    if (existingAdmin) {
      if (existingAdmin.password === password) {
        // Set cookie
        const cookie = serialize('Login', 'true', {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'strict'
        });
        return new Response(
          JSON.stringify({ success: true, message: 'Login successful' }),
          { status: 200, headers: { 'Set-Cookie': cookie } }
        );
      } else {
        return new Response(
          JSON.stringify({ success: false, message: 'Incorrect password' }),
          { status: 401 }
        );
      }
    } else {
      return new Response(
        JSON.stringify({ success: false, message: 'Email not found' }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error logging in' }),
      { status: 500 }
    );
  }
}
