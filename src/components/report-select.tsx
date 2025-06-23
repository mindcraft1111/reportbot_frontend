import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Project } from "./prompt-sidebar";

export default function ReportSelect({
  selectedReportId,
  setSelectedReportId,
  selectedProject,
}: {
  selectedReportId: string;
  setSelectedReportId: React.Dispatch<React.SetStateAction<string>>;
  selectedProject: Project | undefined;
}) {
  return (
    <Select
      value={String(selectedReportId)}
      onValueChange={(reportId) => setSelectedReportId(reportId)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="리포트 선택" />
      </SelectTrigger>
      <SelectContent>
        {selectedProject?.report_list.map((report) => (
          <SelectItem key={report.id} value={String(report.id)}>
            {report.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
