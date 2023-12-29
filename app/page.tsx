import Link from "next/link";

async function Page() {
  return (
    <Link href={"/login"}>
      <p className="font-semibold text-xl">Login</p>
    </Link>
  );
}

export default Page;
