"use client";

import { CirclePlus, Trash2 } from "lucide-react";
import type { CheckListProps } from "./CheckLists";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { deleteList } from "@/actions/list";
import { toast } from "sonner";
import CreateTaskModal from "./CreateTaskModal";


export default function CheckListFooter({ checkList }: CheckListProps) {
  const { id, createdAt } = checkList

  const deleteCheckList = async () => {
    try {
      await deleteList(id);
      toast.success("操作成功", {
        description: "清单已经删除",
      });
    } catch (e) {
      console.log(e);
      toast.error("操作失败", {
        description: "清单删除失败，请稍后重试",
      });
    }
  };

  return <div className="">
    <Separator />
    <footer className="flex flex-1 justify-between items-center text-white rounded-b-lg h-[60px] w-full -p-4">
      <p>创建于 {createdAt.toLocaleDateString("zh-CN")}</p>
      <div className="flex gap-2 justify-between items-center">
        <CreateTaskModal checkList={checkList} />
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