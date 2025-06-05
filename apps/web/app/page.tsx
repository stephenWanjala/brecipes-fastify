import Link from 'next/link';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/home/hero-section';
import FeatureSection from '@/components/home/feature-section';
import ApiOverview from '@/components/home/api-overview';
import CodeExample from '@/components/home/code-example';
import CTA from '@/components/home/cta-section';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <FeatureSection />
      <ApiOverview />
      <CodeExample />
      <CTA />
    </div>
  );
}