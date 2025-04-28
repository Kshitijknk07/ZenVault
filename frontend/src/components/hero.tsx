import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="w-full max-w-4xl px-4">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        Secure File Storage Made Simple
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Store, organize, and access your files from anywhere with end-to-end
        encryption.
      </p>
      <Button className="mt-8" size="lg">
        Get Started
      </Button>
    </section>
  );
}
