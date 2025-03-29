export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto my-auto max-w-7xl flex flex-col gap-12 items-start">
      {children}
    </div>
  );
}
