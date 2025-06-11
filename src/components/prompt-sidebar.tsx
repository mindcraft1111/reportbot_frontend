import { Link } from "react-router";

type Product = {
  product_id: number;
  product_name: string;
  brand: string;
  product_price: number;
  discount_rate: number;
};

const products: Product[] = [
  {
    product_id: 1,
    product_name: "소니 WH-CH720N(블랙)",
    brand: "소니",
    product_price: 199000,
    discount_rate: 30,
  },
  {
    product_id: 2,
    product_name: "젠하이저 ACABE7T(블랙)",
    brand: "젠하이저",
    product_price: 229000,
    discount_rate: 21,
  },
  {
    product_id: 3,
    product_name: "네티토 고양이 투명모래",
    brand: "네티토",
    product_price: 30900,
    discount_rate: 16,
  },
  {
    product_id: 4,
    product_name: "아띠클린솔루션 그랜드마스터 프리미엄 대용량",
    brand: "한여름엔",
    product_price: 50900,
    discount_rate: 18,
  },
  {
    product_id: 5,
    product_name: "아이러브비비 시그니처 골드크림",
    brand: "지앤디랩",
    product_price: 50900,
    discount_rate: 44,
  },
  {
    product_id: 6,
    product_name: "브라운 프리밍 카키",
    brand: "브라운",
    product_price: 60900,
    discount_rate: 48,
  },
  {
    product_id: 7,
    product_name: "일렉트로룩스 WQ61-1EDB 무선청소기",
    brand: "일렉트로룩스",
    product_price: 239000,
    discount_rate: 0,
  },
  {
    product_id: 8,
    product_name: "더에이치 자이온 무선청소기 THE NEW",
    brand: "더에이치",
    product_price: 79000,
    discount_rate: 35,
  },
  {
    product_id: 9,
    product_name: "주파집 차량용 핸드폰 고속 무선충전 거치대 QC-6",
    brand: "주파집",
    product_price: 53000,
    discount_rate: 45,
  },
  {
    product_id: 10,
    product_name: "신지모루 오그랩 자동차 차량용 무선 고속충전 거치대",
    brand: "신지모루",
    product_price: 62900,
    discount_rate: 52,
  },
];

export default function PromptSidebar() {
  return (
    <aside className="w-64 h-screen overflow-y-auto bg-gray-100  border-r p-4">
      <h2 className="text-xl mb-4 text-blue-700">Products</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.product_id}>
            <Link
              to={`/prompt-test/${product.product_id}`}
              className="block px-3 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm"
            >
              {product.product_name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
