import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  return (
    <section className="w-full py-24 bg-primary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[80%] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[50%] h-[80%] bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Ready to Secure Your Files?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Join thousands of users who trust ZenVault for their file storage
            needs. Get started today with our free plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base px-8 py-6">
              Sign Up Free
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 py-6">
              View Pricing
            </Button>
          </div>

          <div className="mt-16 flex flex-col md:flex-row gap-8 justify-center text-left">
            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                <svg
                  className="h-5 w-5 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">No Credit Card Required</h3>
                <p className="text-sm text-muted-foreground">
                  Start with our free plan, no payment information needed.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                <svg
                  className="h-5 w-5 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Cancel Anytime</h3>
                <p className="text-sm text-muted-foreground">
                  No long-term contracts, cancel your subscription whenever you
                  want.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                <svg
                  className="h-5 w-5 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Our support team is available around the clock to help you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
