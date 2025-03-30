import { ThemeSwitcher } from "@/components/theme-switcher";

export function Footer() {
  return (
    <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-4 py-4 bg-gray-900 text-white">
      <p>© 2025 Salespath</p>
      <div>
        <ThemeSwitcher />
      </div>
    </footer>
  );
}
