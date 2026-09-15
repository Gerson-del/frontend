export default function SidebarFooter() {
  return (
    <footer className="border-t border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-700">
          G
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-900">Gerson</p>

          <p className="truncate text-xs text-gray-500">Job Tracker</p>
        </div>
      </div>
    </footer>
  );
}
