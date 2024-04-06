import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Not Found",
  description: "The page your are looking for does not exist.",
};

export default function Custom404() {
  return (
    <div className="lg:flex lg:mt-10 xl:px-48">
      <div className="h-3/4 flex flex-col items-center text-textColorSoft justify-center lg:w-1/2 lg:mt-10">
        <h1 className="text-9xl font-extrabold text-center my-4 lg:my-8">
          404
        </h1>
        <h2 className="font-bold text-2xl lg:text-5xl text-textColorSoft text-center my-4 lg:my-8">
          Page not found!
        </h2>
        <Link
          href="/"
          className="font-bold text-xl text-center border border-textColorSoft rounded-lg p-2 my-4 lg:my-8 hover:scale-105 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
      <div className="lg:w-1/2 flex items-center justify-center mt-6 ml-4">
        <Image
          src="/not_found.svg"
          alt="404 not found image"
          className="fly w-48 md:w-80 lg:w-80"
          width={192}
          height={320}
        />
      </div>
    </div>
  );
}
