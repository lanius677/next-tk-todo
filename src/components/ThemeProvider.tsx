// ... existing code ...
import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

/**
 * 主题提供商组件，用于在应用中管理主题
 * @param props - 主题提供商的属性
 * @param props.children - 需要被主题提供商包装的子组件
 * @param props - 传递给NextThemesProvider的其他属性
 * @returns 包装了NextThemesProvider的React组件
 */
export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
// ... existing code ...