import clsx from "clsx";
import Aurora from "./Aurora";
import NavBar from "./NavBar";

interface PageBuilderProps {
  children: React.ReactNode;
  padding?: boolean;
  showAuroraBackground?: boolean;
}

export default function PageBuilder({
  children,
  padding = true,
  showAuroraBackground = false,
}: PageBuilderProps) {
  return (
    <div className="flex flex-col bg-gray-900 text-white text-xl sm:text-2xl md:text-3xl relative overflow-hidden">
      <NavBar />

      {showAuroraBackground && <Aurora speed={0.3} />}

      <div className="flex flex-col min-h-dvh z-10">
        <main
          className={clsx("grow flex flex-col h-full", {
            "p-5 md:p-10 pt-20 md:pt-30": padding,
          })}
        >
          {children}
        </main>
      </div>
    </div>
  );
}