import EmailModel from "@/Model/Email";
import dbConnect from '@/DB/dbConnet';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, url } = await request.json(); // Destructure email and url from request body

    const existingEmail = await EmailModel.findOne({ userEmail: email });

    if (existingEmail) {
      // Check if URL already exists
      if (!existingEmail.urls.includes(url)) {
        existingEmail.urls.push(url); // Add new URL to array
      }
      existingEmail.count += 1;
      await existingEmail.save();

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Count incremented and URL added (if unique)',
        }),
        { status: 200 }
      );
    }

    const newUser = new EmailModel({
      userEmail: email,
      count: 1,
      urls: [url], // Add initial URL for new user
    });

    await newUser.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'User created successfully with initial URL',
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error registering user',
      }),
      { status: 500 }
    );
  }
}
