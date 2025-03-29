import { Button } from "../ui/Button";
import { Check } from "lucide-react";

export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for personal use",
      features: [
        "5GB secure storage",
        "End-to-end encryption",
        "Access on 2 devices",
        "Basic file organization",
        "7-day version history",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      description: "For professionals and small teams",
      features: [
        "100GB secure storage",
        "End-to-end encryption",
        "Access on unlimited devices",
        "Advanced file organization",
        "30-day version history",
        "Priority support",
        "Secure file sharing",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$24.99",
      period: "/month",
      description: "For organizations with advanced needs",
      features: [
        "1TB secure storage",
        "End-to-end encryption",
        "Access on unlimited devices",
        "Advanced file organization",
        "Unlimited version history",
        "24/7 priority support",
        "Advanced sharing controls",
        "Admin dashboard",
        "User management",
        "Custom branding",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Pricing
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Choose the plan that's right for you. All plans include a 14-day
            free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass rounded-xl p-8 relative ${
                plan.popular
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-foreground/70 ml-1">{plan.period}</span>
                )}
              </div>
              <p className="text-foreground/70 mb-6">{plan.description}</p>
              <Button
                className={`w-full mb-8 ${
                  plan.popular
                    ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    : ""
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
