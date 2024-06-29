import EmailModel from "@/Model/Email";
import dbConnect from '@/DB/dbConnet';

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { email } = await request.json();
        const existingEmail = await EmailModel.findOne({ userEmail: email });

        if (existingEmail) {
            await existingEmail?.deleteOne();
            return new Response(
                JSON.stringify({
                  success: true,
                  message: 'Deleted Successfully',
                }),
                { status: 201 }
              );
        } else {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Already Deleted',
                }),
                { status: 404}
            );
        }
        
    }
    catch (error) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: 'Error Delete of User',
            }),
            { status: 500 }
        );
    }
}