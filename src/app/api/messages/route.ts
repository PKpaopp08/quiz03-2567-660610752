import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  readDB();
  const body = await request.json();
  const foundId = DB.rooms.findIndex(
    (room) => room.roomId === body.roomId
  );
  if (foundIndex === -1) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  readDB();

  const body = await request.json();
  const foundId = DB.rooms.findIndex(
    (room) => room.roomId === body.roomId
  );
  if (foundIndex === -1) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );
  }
};

  const messageId = nanoid();

  writeDB();

  return NextResponse.json({
    ok: true,
    //messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request: NextRequest) => {
  const payload = checkToken();
  const body = await request.json();
  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: "Invalid token",
  //   },
  //   { status: 401 }
  // );

  readDB();

  const body = await request.json();
  const foundId = DB.messageId.findIndex(
    (room) => messages.messageId === body.roomId
  );
  if (foundId === -1) {
    return NextResponse.json(
      {
        ok: false,
        message: "Message is not found",
      },
      { status: 404 }
    );
  }
  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
