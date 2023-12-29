"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function LoginForm() {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center gap-5"
        style={{
          width: "600px",
          height: "400px",
          borderRadius: "10px",
          background: "#FFF",
          boxShadow: "0px 0px 20px 5px rgba(20, 51, 114, 0.25)",
        }}
      >
        <Image src="/img/logo.png" alt="" width={175} height={200} />
        <h1
          style={{
            color: "#38434A",
            fontFamily: "Montserrat",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          TSL - Shoter Link for better life
        </h1>
        <LoginButton />
      </div>
    </>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      className="bg-white hover:bg-[#FBCBBB]"
      style={{
        fontWeight: "bold",
        border: "1px solid #FBCBBB",
        color: "#38434A",
        padding: "15px 30px",
        borderRadius: "5px",
      }}
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
    >
      <Image
        src="/img/google.png"
        alt=""
        width={25}
        height={25}
        className="mr-3"
      />{" "}
      Log in with Google
    </Button>
  );
}
