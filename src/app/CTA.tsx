import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-primary py-16">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to transform your field sales operations?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Join SalesPath today and take your sales team to the next level.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
