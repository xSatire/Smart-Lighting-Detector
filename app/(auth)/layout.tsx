import { Image, Lightbulb } from "lucide-react";

interface authLayout {
  children: React.ReactNode;
}

const authLayout = ({ children }: authLayout) => {
  return (
    <div className="w-full h-full lg:grid lg:grid-cols-2 ">
      <div className="col-span-2 lg:col-span-1 h-full">{children}</div>
      <div className="hidden bg-muted w-full h-full col-span-1 lg:flex lg:flex-col lg:justify-center lg:items-center">
        <div className="w-1/2 h-1/2 relative">
          <Lightbulb className="w-full h-full fill-yellow-300" />
        </div>
      </div>
    </div>
  );
};

export default authLayout;
