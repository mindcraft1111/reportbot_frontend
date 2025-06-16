import type { ReactNode } from "react";

export default function AuthButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-slate-900 border border-gray-400 bg-transparent hover:bg-gray-50 transition-all"
      onClick={() => handleClick()}
    >
      {children}
    </button>
  );
}
