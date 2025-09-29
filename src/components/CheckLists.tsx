import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import type { List, Task } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { ListMap } from "@/lib/const";
import CheckListFooter from "./CheckListFooter";
import TaskItem from "./TaskItem";

export interface CheckListProps {
  checkList: List & {
    tasks: Task[];
  };
}

export function CheckList({ checkList }: CheckListProps) {
  const { name, color, tasks } = checkList;

  return (
    <Card className={cn("w-full text-white sm:col-span-2", ListMap.get(color))}
      x-chunk="dashboard-05-chunk-0">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 && <p>目前没有任务</p>}
        {tasks.length > 0 && (
          <div>
            {tasks.map((task) => {
              return <TaskItem key={task.id} task={task} />;
            })}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <CheckListFooter checkList={checkList} />
      </CardFooter>
    </Card>
  )

}

export async function CheckLists() {
  const user = await currentUser();

  const checkLists = await prisma.list.findMany({
    where: {
      userId: user?.id,
    },
     include: {
      tasks: true,
    },
  });

  if (checkLists.length === 0) {
    return <div className="mt-4">尚未创建清单，赶紧创建一个吧!</div>;
  }
  return (
    <div className="mt-6 flex w-full flex-col gap-4">
      {checkLists.map((checkList) => (
        <CheckList key={checkList.id} checkList={checkList} />
      ))}
    </div>
  );
}
