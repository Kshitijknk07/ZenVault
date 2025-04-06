import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CallToAction() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zen-blue/20 via-zen-purple/10 to-zen-teal/10 opacity-30 dark:opacity-20" />
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Secure Your Digital Future?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto">
            Join thousands of users who trust ZenVault with their important
            files. Get started now with a free account and experience the
            perfect balance of security and simplicity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="gap-1">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
