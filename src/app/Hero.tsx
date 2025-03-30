import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/assets/hero.png";

export default function Hero() {
  return (
    <section className="relative">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Empower Your{" "}
              <span className="text-primary">Field Sales Team</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              SalesPath helps you track, manage, and optimize your field sales
              operations. Monitor team location, allocate tasks, track leads,
              and calculate payouts all in one place.
            </p>
            <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              {/* <Link href="#demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Watch demo
                </Button>
              </Link> */}
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl"></div>
            <Image
              src={HeroImage}
              alt="SalesPath Dashboard"
              className="relative rounded-2xl shadow-xl"
            />
            {/* <img
              src="/hero.png?height=600&width=500"
              alt="SalesPath Dashboard"
              className="relative rounded-2xl shadow-xl"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
