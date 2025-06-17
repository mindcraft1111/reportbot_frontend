export default function PageLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return <section className="p-2">{children}</section>;
}
