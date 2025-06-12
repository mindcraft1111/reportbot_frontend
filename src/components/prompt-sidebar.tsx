import { Link } from "react-router";

type Product = {
  product_id: number;
  product_name: string;
  brand: string;
  product_price: number;
  discount_rate: number;
};

const categoryList = [
  {
    category_id: 1,
    category_name_ko: "헤드폰",
    category_name_en: "Headphone",
  },
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

export default function PromptSidebar() {
  return (
    <aside className="w-64 h-screen overflow-y-auto bg-gray-100  border-r p-4">
      <h2 className="text-xl mb-4 text-blue-700">Products</h2>
      <ul className="space-y-2">
        {categoryList.map((category) => (
          <li key={category.category_id}>
            <Link
              to={`/prompt-test/${category.category_id}?category_name_ko=${category.category_name_ko}`}
              className="block px-3 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              {category.category_name_ko}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
