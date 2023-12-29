import {link} from "@/lib/link";
import { redirect } from "next/navigation";

async function DashboardPage() {
  const test = await link.increaseCount({
    linkId: "clqq85p7j0005pkapmbehjz25", 
  }); 

  console.log({test})
  console.log( await link.getAll({
    userId:"clqq3zd1k0000hzd9o4z99i37",
    search:"youtube"
  }))
  // redirect('https://blog.logrocket.com/build-rest-api-elixir-phoenix/');
  return <div>DashboardPage</div>;
}

export default DashboardPage;
