import EmailModel from "@/Model/Email";
import dbConnect from '@/DB/dbConnet';

export async function GET() {
  await dbConnect();
  try {
    // Fetch all data from the User model
    const users = await EmailModel.find({});
    
    // Return the data as JSON
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    
    // Return an error response
    return new Response(JSON.stringify({ success: false, message: 'Error fetching users' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
