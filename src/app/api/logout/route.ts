import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Clear the admin token cookie by setting it to expire
    const cookieStore = await cookies();

    // Clear the admin_token cookie
    cookieStore.set("admin_token", "", {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 0, // Expire immediately
      expires: new Date(0), // Set to past date
    });

    return NextResponse.json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}
