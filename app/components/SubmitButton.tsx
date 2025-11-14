import clsx from "clsx";

interface SubmitButtonProps {
    label: string;
    errorMessage?: string;
    successMessage?: string;
    disabled?: boolean;
};

export default function SubmitButton({ label, errorMessage, successMessage, disabled = false }: SubmitButtonProps) {
  const baseClassName = clsx(
    "w-full rounded-2xl sm:rounded-3xl md:rounded-[1.75rem] liquid-glass py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 font-semibold transition-all duration-300 ease-in-out",
    disabled
      ? "opacity-30 cursor-not-allowed inset-shadow-sm inset-shadow-black"
      : "cursor-pointer"
  );
  return (
    <>
      <button
        type="submit"
        disabled={disabled}
        className={baseClassName}
      >
        {label}
      </button>
      {successMessage && <p className="text-green-400">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </>
  );
}