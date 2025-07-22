"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Image
        src="/Image_one.jpg"
        alt="image"
        fill
        className="object-cover blur-2xl"
      />
      <div className="absolute inset-0 flex justify-center items-center px-auto">
        <div className="flex flex-col gap-8 items-center">
          <div className="text-6xl font-bold text-white text-center">
            Welcome To The World of Best Quiz Collection
          </div>
          <div onClick={() => router.push("/selectdifficulty")}>
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                backgroundColor: "none",
                color: "white",
                borderRadius: 3,
                border: 2,
                padding: `12px 30px`,
                width: `250px`,
                "&:hover": {
                  borderRadius: 10,
                },
              }}
            >
              <span className="text-2xl">Start Quiz</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
