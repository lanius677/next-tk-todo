"use client";

import { CirclePlus, Trash2 } from "lucide-react";
import type { CheckListProps } from "./CheckLists";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";


export default function CheckListFooter({ checkList }: CheckListProps) {
  const { createdAt } = checkList

  const deleteCheckList = async () => {
    console.log(1);
  };

  return <div className="">
    <Separator />
    <footer className="flex justify-between items-center p-4 text-white rounded-b-lg  h-[60px] w-full
     text-sm">
      <p>创建于 {createdAt.toLocaleDateString("zh-CN")}</p>
      <div className="flex gap-2">
        <Button size={"icon"} variant={"ghost"}>
          <CirclePlus />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <Trash2 />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确定要删除吗？</AlertDialogTitle>
              <AlertDialogDescription>该操作无法撤回</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={deleteCheckList}>
                确定
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </footer>
  </div>

}