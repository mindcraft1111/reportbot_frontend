import { useGeneralContext } from "@/contexts/GeneralContext";
import { Link } from "react-router";

const categoryList = [
  { category_id: 1, category_name_ko: "헤드폰", category_name_en: "Headphone" },
  {
    category_id: 2,
    category_name_ko: "고양이 용품",
    category_name_en: "Cat Supplies",
  },
  {
    category_id: 3,
    category_name_ko: "스킨케어",
    category_name_en: "Skincare",
  },
  {
    category_id: 4,
    category_name_ko: "생활가전",
    category_name_en: "Home Appliances",
  },
  {
    category_id: 5,
    category_name_ko: "차량용 액세서리",
    category_name_en: "Car Accessories",
  },
];

export default function PromptSidebar({
  category_id,
}: {
  category_id: string;
}) {
  const { isSidebarOpen } = useGeneralContext();
  return (
    <aside
      className={`min-w-64 ${
        isSidebarOpen ? "visible fixed" : "hidden"
      } sm:block  overflow-y-auto bg-gray-100 border-r p-4`}
      style={{ height: "calc(100vh - 70px)" }}
    >
      <h2 className="text-xl mb-4 text-blue-700">Products</h2>
      <ul className="space-y-2">
        {categoryList.map((category) => {
          const isActive = String(category.category_id) === category_id;
          return (
            <li
              key={category.category_id}
              className={isActive ? "bg-blue-100 rounded-md" : ""}
            >
              <Link
                to={`/prompt-test/${category.category_id}?category_name_ko=${category.category_name_ko}`}
                className={`block px-3 py-2 rounded-md transition-colors text-sm ${
                  isActive
                    ? "text-blue-800 font-semibold"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                {category.category_name_ko}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
