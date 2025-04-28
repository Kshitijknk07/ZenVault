import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const plans = [
  {
    name: "Community",
    price: "Free",
    description: "Personal, self-hosted storage for individuals",
    features: [
      "All core features",
      "Store files locally on your own device or server",
      "No cloud or third-party storage",
      "Basic support via community forums",
      "Open source",
    ],
    limitations: ["No official support", "No advanced admin tools"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro License",
    price: "49",
    description: "Advanced features and priority support for power users",
    features: [
      "All Community features",
      "Priority email support",
      "Advanced file recovery",
      "Extended version history",
      "Team collaboration tools",
      "Commercial use allowed",
    ],
    limitations: [],
    cta: "Buy License",
    popular: true,
  },
  {
    name: "Business License",
    price: "199",
    description:
      "Enterprise-grade features and dedicated support for organizations",
    features: [
      "All Pro features",
      "User management dashboard",
      "Custom security policies",
      "API access",
      "On-premises deployment assistance",
      "1 year of dedicated support",
      "Compliance documentation",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your local storage needs. All plans are
            self-hosted—your files never leave your device or server.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-background rounded-xl p-6 shadow-sm border ${
                plan.popular
                  ? "border-accent shadow-md relative"
                  : "border-border/50"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                  Most Popular
                </Badge>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end justify-center gap-1 mb-2">
                  <span className="text-3xl font-bold">$</span>
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="mt-1 h-4 w-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 text-green-500" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="mt-1">
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Not included in this plan</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="text-sm text-muted-foreground line-through">
                      {limitation}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.popular ? "default" : "outline"}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
