import { redirect } from "next/navigation";

export default function Page() {
  // Bu fonksiyon çağrıldığı an Next.js geri kalan render işlemini durdurur
  // ve kullanıcıyı direkt /docs yoluna fırlatır.
  redirect("/docs");
  
 
}