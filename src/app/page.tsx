import Layout from '../components/Layout/Layout';
import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import ObjectivesSection from '../components/home/ObjectivesSection';
import BeneficiariesSection from '../components/home/BeneficiariesSection';
import AchievementsSection from '../components/home/AchievementsSection';
import ConsultSection from '../components/home/ConsultSection';
import Link from 'next/link';
import PartnersCarousel from '@/components/home/PartnersCarousel';

export default function Home() {
  return (
    <Layout title="Proyecto PLANTAS - Inicio | Palanca para la Transición Agrosostenible">
      <Hero />
      <AboutSection />
      <PartnersCarousel />
      <ObjectivesSection />
      <BeneficiariesSection />
    </Layout>
  );
}