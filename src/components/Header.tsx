import { UserButton } from "@clerk/nextjs";
import ModeToggle from "./ThemeToggle";

/**
 * 应用程序的顶部导航栏组件
 * 
 * 该组件渲染一个固定高度的导航栏，包含应用标题和用户操作区域。
 * 用户操作区域包括用户登录按钮和主题切换按钮。
 */
export default function Header() {
  return (
    <nav className="flex h-[60px] w-full items-center justify-between p-4">
      <h1>TK清单</h1>
      <div className="flex items-center gap-2">
        <UserButton />
        <ModeToggle />
      </div>
    </nav>
  );
}