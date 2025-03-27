import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Creator from './components/Creator';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Hero />
            <Features />
            <Pricing />
            <FAQ />
            <Creator />
        </div>
    );
};

export default Home;