import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  hideNavbar?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, title, hideNavbar = false }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Plataforma web del Proyecto PLANTAS - Palanca para la Transición Agrosostenible, apoyado por el programa AL-INVEST Verde de la Unión Europea" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
         {!hideNavbar && <Navbar />}
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Layout;