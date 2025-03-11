import { Check, Sparkles, CreditCard, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for personal use',
    features: [
      '5GB Storage',
      'Basic file sharing',
      'Mobile access',
      'Email support',
      '2 Factor Authentication',
    ],
    cta: 'Sign up for free',
    popular: false,
    ctaLink: '/signup',
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    description: 'For professionals and small teams',
    features: [
      '100GB Storage',
      'Advanced sharing options',
      'Version history (30 days)',
      'Priority support',
      'Team collaboration tools',
      'Advanced security features',
    ],
    cta: 'Start your trial',
    popular: true,
    ctaLink: '/signup',
  },
  {
    name: 'Enterprise',
    price: '$24.99',
    period: '/month',
    description: 'For organizations with advanced needs',
    features: [
      'Unlimited Storage',
      'Advanced admin controls',
      'Unlimited version history',
      '24/7 dedicated support',
      'Custom integration options',
      'Advanced analytics',
      'Enterprise-grade security',
    ],
    cta: 'Contact sales',
    popular: false,
    ctaLink: '#',
  },
];

const Pricing = () => {
  return (
    <div id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent opacity-60"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-accent/10 text-accent mb-6 text-sm font-medium">
            <CreditCard className="h-4 w-4 mr-2" />
            <span>Simple Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Choose your <span className="text-gradient">perfect plan</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start with our free plan or upgrade for more features. All plans include enterprise-grade security and core functionality.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 animate-fade-in bg-white/80 backdrop-blur-sm border border-border hover:border-accent/20 shadow-sm hover:shadow-soft-xl ${
                plan.popular ? 'md:scale-105 md:shadow-soft-xl z-10' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute top-0 inset-x-0">
                  <div className="flex justify-center -translate-y-1/2">
                    <div className="px-4 py-1 rounded-full bg-gradient-accent text-white text-xs font-medium shadow-accent-sm flex items-center">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Most Popular
                    </div>
                  </div>
                </div>
              )}

              <div className="px-6 sm:px-8 py-8 sm:py-10">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground">{plan.description}</p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-extrabold">{plan.price}</span>
                  {plan.period && <span className="ml-2 text-lg font-medium text-muted-foreground">{plan.period}</span>}
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-muted-foreground">What's included</h4>
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start group">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center mt-0.5 transition-all duration-200 group-hover:bg-accent/20">
                          <Check className="h-3 w-3 text-accent" />
                        </div>
                        <span className="ml-3 text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10">
                  <Link
                    to={plan.ctaLink}
                    className={`w-full px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 flex items-center justify-center ${
                      plan.popular
                        ? 'bg-gradient-accent text-white shadow-accent-sm hover:shadow-accent-glow'
                        : 'bg-secondary hover:bg-secondary/80 text-foreground'
                    }`}
                  >
                    {plan.popular && <Zap className="h-4 w-4 mr-2" />}
                    {plan.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
              <p className="text-muted-foreground mb-6">
                Have questions about our pricing? Here are some common questions we get asked.
              </p>
              <Link
                to="#faq"
                className="inline-flex items-center text-accent hover:text-accent/80 font-medium"
              >
                View all FAQs
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: 'Can I upgrade or downgrade my plan at any time?',
                  a: 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the end of your billing cycle.'
                },
                {
                  q: 'Is there a discount for annual billing?',
                  a: 'Yes, you can save 20% by choosing annual billing on any of our paid plans.'
                },
              ].map((faq, i) => (
                <div key={i} className="pb-4 border-b border-border last:border-0 last:pb-0">
                  <h4 className="text-lg font-semibold mb-2">{faq.q}</h4>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;