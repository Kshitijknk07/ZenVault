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
    name: "Free",
    price: "0",
    description: "Essential secure storage for personal use",
    features: [
      "5 GB secure storage",
      "End-to-end encryption",
      "File sharing with 3 users",
      "Mobile and desktop access",
      "Basic support",
    ],
    limitations: ["No advanced sharing", "Limited version history"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "9.99",
    description: "Advanced security and features for professionals",
    features: [
      "100 GB secure storage",
      "Priority encryption",
      "Unlimited file sharing",
      "30-day version history",
      "Advanced file recovery",
      "Priority support",
      "Team collaboration tools",
    ],
    limitations: [],
    cta: "Try Free for 14 Days",
    popular: true,
  },
  {
    name: "Business",
    price: "29.99",
    description: "Enterprise-grade solution for teams",
    features: [
      "1 TB secure storage per user",
      "Advanced admin controls",
      "Unlimited version history",
      "User management dashboard",
      "Custom security policies",
      "API access",
      "24/7 dedicated support",
      "Compliance reporting",
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
            Choose the perfect plan for your secure storage needs.
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
