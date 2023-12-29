import {link} from "@/lib/link";
import { redirect } from "next/navigation";
import { UAParser } from 'ua-parser-js'; 
import { headers } from "next/headers"
import { comparePassword } from "@/lib/password";

async function RedirectPage({ params , searchParams }: { params: { slug: string }, searchParams: {password: string} }) {
  const myLink = await link.getBySlug({
    slug:params.slug
  }); 

  if (myLink.data) {
    if (myLink.data.password && !comparePassword(searchParams.password??"",myLink.data.password)){
      //TODO: Làm cái page cho user nhập password. xong truyền ?password=xxxx lên
      redirect("/") 
    }
  
    const userAgent = headers().get("user-agent") 
    const parser = new UAParser(userAgent as string);
  
    switch(parser.getResult()?.os["name"]) {
      case "Android":
        redirect(myLink.data["androidTargeting"]??myLink.data["url"]);
      case "iOS":
        redirect(myLink.data["iOSTargeting"]??myLink.data["url"]);
      default:
        redirect(myLink.data["url"]);
    } 
  } 
  return redirect("/");
}
 
export default RedirectPage;
 