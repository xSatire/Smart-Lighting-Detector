import { Image } from "lucide-react";

interface authLayout {
  children: React.ReactNode;
}

const authLayout = ({ children }: authLayout) => {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="col-span-2 lg:col-span-1">{children}</div>
      <div className="hidden bg-muted w-full h-full col-span-1 lg:flex lg:flex-col lg:justify-center lg:items-center">
        <div className="w-1/2 h-1/2 relative">
          <Image className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default authLayout;
