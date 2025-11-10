interface SubmitButtonProps {
    label: string;
    errorMessage?: string;
    successMessage?: string;
};

export default function SubmitButton({ label, errorMessage, successMessage }: SubmitButtonProps) {
  return (
    <>
      <button
        type="submit"
        className="w-full rounded-md bg-indigo-500 py-2 px-4 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {label}
      </button>
      {successMessage && <p className="text-green-400">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </>
  );
}