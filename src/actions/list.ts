'use server';

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createListZodSchema, type createListZodSchemaType } from "@/schema/createList";

export async function createList(data: createListZodSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("用户未登录，请先登录");
  }

  const result = createListZodSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: result.error.flatten().fieldErrors,
    };
  }

  // Todo: 数据库处理
  await prisma.list.create({
    data: {
      userId: user.id,
      color: data.color,
      name: data.name,
    },
  });

  console.log(data);

  revalidatePath("/");

  return {
    success: true,
    message: "清单创建成功",
  };
}

export async function deleteList(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new Error("用户未登录，请先登录");
  }

  await prisma.list.delete({
    where: {
      id: id,
      userId: user.id,
    },
  });

  revalidatePath("/");
}