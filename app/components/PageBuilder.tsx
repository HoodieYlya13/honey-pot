import clsx from "clsx";
import Aurora from "./Aurora";

interface PageBuilderProps {
  children: React.ReactNode;
  padding?: boolean;
  fullScreen?: boolean;
  showAuroraBackground?: boolean;
}

export default function PageBuilder({
  children,
  padding = true,
  fullScreen = true,
  showAuroraBackground = false,
}: PageBuilderProps) {
  return (
    <div className="flex flex-col bg-gray-900 text-white text-xl sm:text-2xl md:text-3xl min-h-screen relative overflow-hidden">
      {showAuroraBackground && <Aurora />}

      <div className="flex flex-col min-h-screen z-10">
        <main
          className={clsx("grow flex flex-col", {
            "p-5 md:p-10": padding,
            "min-h-screen": fullScreen,
          })}
        >
          {children}
        </main>
      </div>
    </div>
  );
}