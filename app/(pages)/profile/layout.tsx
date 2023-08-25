import { Providers } from "@/app/providers";
import Navbar from "@/components/Navbar/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Navbar />
      <main className="w-full py-5 px-[5%] 2xl:px-0 flex justify-center items-center">
        <div id="container" className="w-full max-w-[1450px]">
          {children}
        </div>
      </main>
    </div>
  );
}
