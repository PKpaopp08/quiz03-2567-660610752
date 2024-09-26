import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@lib/DB";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (request: NextRequest) => {
  readDB();
  const roomId = request.nextUrl.searchParams.get("roomId");
  const roomName = request.nextUrl.searchParams.get("roomName");

 let filtered = DB.room;
  if (roomId !== null) {
    filtered = filtered.filter((room) => room.roomId === roomId);
  }
  
  return NextResponse.json({
    ok: true,
    rooms: filtered ,
    totalRooms: filtered.length,
  });
};

export const POST = async (request: NextRequest) => {
  const payload = checkToken();
 
  const rawAuthHeader = headers().get("authorization");

  if (!rawAuthHeader || !rawAuthHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      {
        ok: false,
        message: "Authorization header is required",
      },
      { status: 401 }
    );
  }
  const token = rawAuthHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET || "This is my special secret";
  let username = null;
  let role = null;
  try {
    const payload = jwt.verify(token, secret);
    username = (<User>payload).username;
    role = (<User>payload).role;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  readDB(); 
  const body = await request.json();
  const found = DB.rooms.find((room) => room.roomId === body.roomId);
  if(found){
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${"replace this with room name"} already exists`,
      },
      { status: 400 }
    );
  }

  const roomId = nanoid();

  //call writeDB after modifying Database
  writeDB();
  DB.rooms.push(body);
  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};

