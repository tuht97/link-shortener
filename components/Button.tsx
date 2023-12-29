import Link from "next/link";

export const PrimaryButton = (props: { href: string; children: string }) => {
  return (
    <Link
      href={"/login"}
      className="bg-white hover:bg-[#FBCBBB]"
      style={{
        fontWeight: "bold",
        textTransform: "uppercase",
        border: "1px solid #FBCBBB",
        fontFamily: "Montserrat",
        color: "#38434A",
        padding: "15px 30px",
        borderRadius: "5px",
      }}
    >
      {props.children}
    </Link>
  );
};
export default PrimaryButton;
