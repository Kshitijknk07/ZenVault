import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  const features = [
    {
      title: "No Credit Card Required",
      description: "Start with our free plan, no payment information needed.",
      icon: (
        <svg
          className="h-6 w-6"
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
      )
    },
    {
      title: "Cancel Anytime",
      description: "No long-term contracts, cancel your subscription whenever you want.",
      icon: (
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v4l3 3"></path>
        </svg>
      )
    },
    {
      title: "24/7 Support",
      description: "Our support team is available around the clock to help you.",
      icon: (
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
      )
    }
  ];

  return (
    <section className="w-full py-24 bg-muted/30 relative overflow-hidden">
      <Container className="relative z-10">
        {/* Main CTA Box */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-background rounded-2xl shadow-xl overflow-hidden border border-border/30 relative">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-[30%] -left-[10%] w-[40%] h-[60%] bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-[30%] -right-[10%] w-[40%] h-[60%] bg-secondary/5 rounded-full blur-3xl"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-secondary/40 to-primary/40"></div>
            </div>

            {/* Content */}
            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                  Ready to Secure Your Files?
                </h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                  Join thousands of users who trust ZenVault for their file storage
                  needs. Get started today with our free plan.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="text-base px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                  >
                    Sign Up Free
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-8 py-6 border-primary/20 hover:bg-primary/5 transition-all duration-300"
                  >
                    View Pricing
                  </Button>
                </div>
              </div>

              {/* Features grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-muted/50 rounded-xl p-6 border border-border/20 hover:border-primary/20 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start">
                      <div className="mr-4 bg-primary/10 p-3 rounded-lg text-primary">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust indicators */}
              <div className="mt-16 pt-8 border-t border-border/20 flex flex-wrap justify-center gap-8 items-center">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium"
                        style={{ zIndex: 4 - i }}
                      >
                        {['JD', 'SM', 'RK', 'AL'][i]}
                      </div>
                    ))}
                  </div>
                  <div className="ml-4">
                    <div className="font-medium">Trusted by 10,000+ users</div>
                    <div className="text-sm text-muted-foreground">Join them today</div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 font-medium">4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
