import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center max-w-md mx-auto">
      <Link href="/" className="self-start text-sm font-semibold flex items-center text-gray-800 py-2">
        <Undo2 className="h-8 w-8 hover:text-gray-600" />
        Home
      </Link>
      <SignIn appearance={{ variables: { colorPrimary: "#0F172A" } }} />
    </div>
  );
}

