import { useGeneralContext } from "@/contexts/GeneralContext";
import { Link } from "react-router";
import { Spinner } from "./spinner";

export type Project = {
  created_at: string;
  description: string;
  product_1_name: string;
  product_2_name: string;
  project_id: number;
  project_title: string;
  report_list: [
    {
      created_at: string;
      id: number;
      title: string;
    }
  ];
  status: string;
  status_changed_at: string;
  updated_at: string;
  user: {
    company: string;
    email: string;
    id: number;
    user_name: string;
  };
};

// export default function PromptSidebar({
//   project_id,
//   isLoading,
//   projectList,
// }: {
//   project_id: string;
//   isLoading: boolean;
//   projectList: Project[];
// }) {
//   const { isSidebarOpen } = useGeneralContext();
//   return (
//     <aside
//       className={`min-w-36 ${
//         isSidebarOpen ? "visible fixed" : "hidden"
//       } sm:block  overflow-y-auto bg-gray-100 border-r p-4`}
//       style={{ height: "calc(100vh - 70px)" }}
//     >
//       <h2 className="text-xl mb-4 text-blue-700">프로젝트</h2>
//       <ul className="space-y-2">
//         {isLoading ? (
//           <Spinner />
//         ) : (
//           projectList.map((project) => {
//             const isActive = String(project.project_id) === 'project_id';
//             return (
//               <li
//                 key={project.project_id}
//                 className={isActive ? "bg-blue-100 rounded-md" : ""}
//               >
//                 <Link
//                   to={`/prompt-test/${project.project_id}?project_title=${project.project_title}`}
//                   className={`block px-3 py-2 rounded-md transition-colors text-sm ${
//                     isActive
//                       ? "text-blue-800 font-semibold"
//                       : "hover:bg-gray-200 text-gray-700"
//                   }`}
//                 >
//                   {project.project_title}
//                 </Link>
//               </li>
//             );
//           })
//         )}
//       </ul>
//     </aside>
//   );
// }

export default function PromptSidebar({
  project_id,
  isLoading,
  projectList,
}: {
  project_id: string;
  isLoading: boolean;
  projectList: Project[];
}) {
  const { isSidebarOpen } = useGeneralContext();

  // 👉 "헤드폰 비교"만 필터링
  const filteredProjectList = projectList.filter(
    (project) => project.project_title === "헤드폰 비교"
  );

  return (
    <aside
      className={`min-w-36 ${
        isSidebarOpen ? "visible fixed" : "hidden"
      } sm:block overflow-y-auto bg-gray-100 border-r p-4`}
      style={{ height: "calc(100vh - 70px)" }}
    >
      <h2 className="text-xl mb-4 text-blue-700">프로젝트</h2>
      <ul className="space-y-2">
        {isLoading ? (
          <Spinner />
        ) : (
          filteredProjectList.map((project) => {
            const isActive = String(project.project_id) === String(project_id);
            return (
              <li
                key={project.project_id}
                className={isActive ? "bg-blue-100 rounded-md" : ""}
              >
                <Link
                  to={`/prompt-test/${project.project_id}?project_title=${project.project_title}`}
                  className={`block px-3 py-2 rounded-md transition-colors text-sm ${
                    isActive
                      ? "text-blue-800 font-semibold"
                      : "hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {project.project_title}
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </aside>
  );
}
