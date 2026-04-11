import { redirect } from "next/navigation";

export default function Page() {
  // Bu fonksiyon çağrıldığı an Next.js geri kalan render işlemini durdurur
  // ve kullanıcıyı direkt /docs yoluna fırlatır.
  redirect("/docs");
  
  // redirect'ten sonra kod yazmana gerek yok, burası asla çalışmaz (unreachable).
  return null; 
}