import Image from "next/image";
import PrimaryButton from "../components/Button";
import MediaCard from "../components/Card";
async function Page() {
  return <HomePage></HomePage>;
}
export const HomePage = () => {
  return (
    <div className="w-screen h-screen bg-white flex flex-col justify-between py-[100px] items-center gap-4 px-5">
      <div className="flex flex-col items-center gap-10">
        <Image src="/img/logo.png" alt="" width={175} height={200} />{" "}
        <h1
          style={{
            color: "#38434A",
            fontFamily: "Montserrat",
            fontSize: "32px",
            fontStyle: "normal",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          THLS - Short Links But more power
        </h1>
      </div>

      <PrimaryButton href={"/login"}>Start for Free</PrimaryButton>
      <div className="flex flex-col md:flex-row w-full md:w-3/4">
        <MediaCard
          src={"/img/link.png"}
          title={"personal, branded links"}
          content={
            "Offers free and unlimited custom domains on all plans for you to create branded links that stand out."
          }
        ></MediaCard>
        <MediaCard
          src={"/img/search.png"}
          title={"links for seo website"}
          content={
            "Customize your link's behavior with device targeting, geo targeting, link cloaking, and more."
          }
        ></MediaCard>
        <MediaCard
          src={"/img/analytic.png"}
          title={"analytics your links"}
          content={
            "powerful analytics for your links, including geolocation, device, browser, and referrer information."
          }
        ></MediaCard>
      </div>
    </div>
  );
};
export default Page;
