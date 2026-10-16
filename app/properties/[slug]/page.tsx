import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar, NavbarWithSearchParams } from '@/components/layout/Navbar';
import { getPropertyBySlug, getAllPropertySlugs } from '@/lib/properties';
import { PropertyGallery } from '@/components/property/PropertyGallery';
import { PropertyFeatures } from '@/components/property/PropertyFeatures';
import { PropertyDescription } from '@/components/property/PropertyDescription';
import { PropertyAmenities } from '@/components/property/PropertyAmenities';
import { MortgageCalculator } from '@/components/property/MortgageCalculator';
import { PropertySidebar } from '@/components/property/PropertySidebar';
import { PropertyBreadcrumb } from '@/components/property/PropertyBreadcrumb';
import { Footer } from '@/components/layout/Footer';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: 'Property Not Found | LuxeEstate',
      description: 'The requested property could not be found.',
    };
  }

  const ogImages = property.images.map((img) => ({
    url: img.imageUrl,
    alt: img.altText || property.title,
  }));

  const description =
    property.description.length > 155
      ? `${property.description.slice(0, 155)}...`
      : property.description;

  return {
    title: `${property.title} — ${property.priceFormatted} | LuxeEstate`,
    description,
    alternates: {
      canonical: `/properties/${property.slug}`,
    },
    openGraph: {
      title: `${property.title} | LuxeEstate`,
      description,
      url: `/properties/${property.slug}`,
      siteName: 'LuxeEstate',
      images: ogImages.length > 0 ? ogImages : [{ url: property.imageUrl }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${property.title} | LuxeEstate`,
      description,
      images: [property.imageUrl],
    },
  };
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  // Schema.org JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `https://luxeestate.com/properties/${property.slug}`,
    image: property.images.map((img) => img.imageUrl),
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.location,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: property.latitude,
      longitude: property.longitude,
    },
  };

  return (
    <div className="min-h-screen bg-background-light text-nordic-dark flex flex-col">
      {/* Injected Structured Data (JSON-LD) for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Sticky Navigation */}
      <Suspense fallback={<Navbar />}>
        <NavbarWithSearchParams />
      </Suspense>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full flex-grow">
        {/* Breadcrumb Navigation */}
        <PropertyBreadcrumb title={property.title} />

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: Gallery & Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Gallery (Hero + Thumbnails + Fullscreen Lightbox) */}
            <PropertyGallery
              images={property.images}
              title={property.title}
              tag={property.tag}
              listingType={property.listingType}
            />

            {/* Property Key Features */}
            <PropertyFeatures
              area={property.area}
              beds={property.beds}
              baths={property.baths}
              garage={property.garage}
            />

            {/* About this Home Description */}
            <PropertyDescription description={property.description} />

            {/* Amenities Grid */}
            <PropertyAmenities amenities={property.amenities} />

            {/* Mortgage Calculator */}
            <MortgageCalculator price={property.price} />
          </div>

          {/* Right Column: Sticky Pricing, Agent & Leaflet Map */}
          <div className="lg:col-span-4 relative">
            <PropertySidebar property={property} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
