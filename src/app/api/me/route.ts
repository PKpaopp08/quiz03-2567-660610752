import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Natthachai Bubpa",
    studentId: "660610752",
  });
};
