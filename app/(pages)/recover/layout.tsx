import Navbar from "@/components/Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center relative">
      {children}
    </main>
  );
}
