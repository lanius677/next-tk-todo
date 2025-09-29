import { useState } from "react";
import type { CheckListProps } from "./CheckLists";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { CalendarDays, CirclePlus } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { createTaskZodSchema, type createTaskZodSchemaType } from "@/schema/createTask";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import dayjs from 'dayjs'
import { Calendar } from "./ui/calendar";
import { ListMap } from "@/lib/const";
import { toast } from "sonner";
import { createTask } from "@/actions/task";

export default function CreateTaskModal({ checkList }: CheckListProps) {
  const { id, name, color } = checkList;

  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(createTaskZodSchema),
    defaultValues: {
      content: "",
      todoId: id,
    },
  })
  const onOpenChange = (open: boolean) => {
    form.reset();
    setOpen(open);
  }

  const onSubmit = async (data: createTaskZodSchemaType) => {
    try {
      console.log(data);
      await createTask(data);
      toast.success("操作成功", {
        description: "任务已经添加！",
      });
      onOpenChange(false);
    } catch (e) {
      console.log(e);
      toast.error("操作失败", {
        description: "任务创建失败，请稍后重试",
      });
    }
  };

  return (
    <div className="">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <CirclePlus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>添加任务</DialogTitle>
            <DialogDescription>任务将添加到 「{name}」 清单</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            <Form {...form}>
              <form
                className="flex flex-col space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>任务内容</FormLabel>
                      <FormControl>
                        <Input className="col-span-3" placeholder="请输入任务内容" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiresAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>截止日期：</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarDays className="mr-2 h-4 w-4" />
                              {field.value &&
                                dayjs(field.value).format("YYYY/MM/DD")}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <DialogFooter>
            <Button
              disabled={form.formState.isSubmitting}
              className={cn(
                "w-full text-white dark:text-white",
                ListMap.get(color),
              )}
              onClick={form.handleSubmit(onSubmit)}
            >
              确认
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )

}