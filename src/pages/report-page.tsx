import { useRequireLogin } from "@/hooks/useRequireLogin";
export default function ReportPage() {
  useRequireLogin();
  return (
    <div className="bg-slate-50 p-2 min-h-[calc(100vh-4rem)]">report page</div>
  );
}
