import { TriangleAlert } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className="bg-destructive/15 flex p-3 items-center gap-x-2 text-sm text-destructive rounded-md">
      <TriangleAlert className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
