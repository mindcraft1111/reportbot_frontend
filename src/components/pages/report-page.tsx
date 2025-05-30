import Sidebar from "../sidebar";

export default function ReportPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex-1">
        report page
      </div>
    </div>
  );
}
