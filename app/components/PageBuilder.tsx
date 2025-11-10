interface PageBuilderProps {
  children: React.ReactNode;
}

export default function PageBuilder({
  children,
}: PageBuilderProps) {
  return (
    <main className="grow min-h-screen w-screen">
      {children}
    </main>
  );
}