import bg from "../../assets/images/bg2.jpg";
import Image from "next/image";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";

const style = {
  container: "h-screen w-screen relative overflow-y-scroll overflow-x-hidden",
  image: "h-full w-full object-cover relative",
  logo: "absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  nav: "absolute top-0 left-0 z-10",
  search:
    "absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/7 w-300px bg-white p-3",
  bar: "max-w-3xl",
  input: "pt-3 pb-3 w-full h-full",
};

export default function Home() {
  return (
    <div className={style.container}>
      <div className={style.nav}>
        <Navbar />
      </div>
      <Image src={bg} className={style.image} />
      <div className={style.logo}>
        <Logo />
      </div>
      <div className={style.search}>
        <nuclia-search-bar
          knowledgebox="043233df-8f5c-443e-8935-4fbee6be7dd3"
          zone="europe-1"
          features="answers"
          className={style.input}
        ></nuclia-search-bar>
        <div className={style.bar}><nuclia-search-results/></div>
      </div>
      <h2 className="absolute bottom-10 left-10 text-2xl text-white">
        Powered with AI
      </h2>
    </div>
  );
}
