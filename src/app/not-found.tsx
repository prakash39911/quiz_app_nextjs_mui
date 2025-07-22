// app/not-found.tsx
import { redirect } from "next/navigation";

export default async function NotFound() {
  // Redirect to home
  redirect("/");
}
