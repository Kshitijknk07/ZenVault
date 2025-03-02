import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "ZenVault has completely transformed how our team collaborates on projects. The security features give us peace of mind when sharing sensitive client information.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "CreativeMinds Agency",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
  },
  {
    content: "I've tried many cloud storage solutions, but ZenVault stands out with its intuitive interface and powerful sharing features. It's become an essential tool for my business.",
    author: "Michael Chen",
    role: "Independent Consultant",
    company: "Chen Consulting",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
  },
  {
    content: "The version history feature has saved me countless times. I can easily track changes and revert to previous versions when needed. ZenVault is worth every penny.",
    author: "Emily Rodriguez",
    role: "Graphic Designer",
    company: "DesignHub Studios",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <div id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center animate-fade-in">
          <h2 className="text-sm text-indigo-600 font-bold tracking-widest uppercase">Testimonials</h2>
          <p className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl leading-tight">
            Loved by professionals<br className="hidden sm:block" /> worldwide
          </p>
          <p className="mt-6 max-w-2xl text-xl text-gray-600 lg:mx-auto leading-relaxed">
            Join thousands of satisfied users who trust ZenVault with their valuable data. Here's what they have to say.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 transition-all duration-200 ${i < testimonial.rating ? 'text-yellow-400 scale-105' : 'text-gray-200'}`} 
                    fill={i < testimonial.rating ? 'currentColor' : 'none'} 
                  />
                ))}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="relative">
                  <img 
                    className="h-14 w-14 rounded-full object-cover ring-4 ring-gray-50" 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                  />
                  <div className="absolute -bottom-1 -right-1 bg-indigo-600 rounded-full p-1">
                    <Star className="h-4 w-4 text-white" fill="currentColor" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-gray-900 font-semibold text-lg">{testimonial.author}</h4>
                  <p className="text-gray-600">{testimonial.role},<br />{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;