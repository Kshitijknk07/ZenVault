import { Check } from 'lucide-react';

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
    highlighted: false,
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
    highlighted: true,
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
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <div id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center animate-fade-in">
          <h2 className="text-sm text-indigo-600 font-bold tracking-widest uppercase">Simple Pricing</h2>
          <p className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl leading-tight">
            Choose your perfect plan
          </p>
          <p className="mt-6 max-w-2xl text-xl text-gray-600 lg:mx-auto leading-relaxed">
            Start with our free plan or upgrade for more features. All plans include enterprise-grade security and core functionality.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`rounded-2xl overflow-hidden transition-all duration-300 animate-fade-in
                ${plan.highlighted
                  ? 'border-2 border-indigo-500 transform scale-105 z-10 bg-white shadow-lg hover:shadow-2xl'
                  : 'border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="px-8 py-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="ml-2 text-xl font-medium text-gray-500">{plan.period}</span>}
                </div>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">{plan.description}</p>
              </div>
              <div className="px-8 pt-6 pb-10 bg-gray-50">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">What's included</h4>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start group">
                      <Check className="flex-shrink-0 h-6 w-6 text-indigo-600 mt-0.5 transition-transform duration-200 group-hover:scale-110" />
                      <span className="ml-3 text-base text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <button
                    className={`w-full px-6 py-4 border rounded-xl text-base font-semibold transition-all duration-200 hover-lift
                      ${plan.highlighted
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent shadow-md hover:shadow-lg'
                        : 'bg-white hover:bg-gray-50 text-gray-900 border-gray-200 hover:border-gray-300'}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;