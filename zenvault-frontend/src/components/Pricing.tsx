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
    <div id="pricing" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Pricing</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Plans for every need
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            Choose the perfect plan for you or your team. All plans include core features.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-sm overflow-hidden
                ${plan.highlighted
                  ? 'border-2 border-indigo-500 transform scale-105 z-10 bg-white'
                  : 'border border-gray-200 bg-white'}`}
            >
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="ml-1 text-xl font-medium text-gray-600">{plan.period}</span>}
                </div>
                <p className="mt-5 text-lg text-gray-600">{plan.description}</p>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">What's included</h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 h-6 w-6 text-indigo-600" />
                      <span className="ml-3 text-base text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <button
                    className={`w-full px-4 py-2 border rounded-md shadow-sm text-sm font-medium
                      ${plan.highlighted
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'}`}
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