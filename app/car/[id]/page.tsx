import Link from "next/link";
import { cars } from "@/lib/cars";
import { getCarImageUrl, getCarGalleryImageUrls } from "@/lib/carImageUtils";
import { getSpin360Url } from "@/lib/spin360";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCarousel from "@/components/ProductCarousel";
import KeyFeatures from "@/components/KeyFeatures";
import PerformanceAndInterior from "@/components/PerformanceAndInterior";
import CarDetailBooking from "@/components/CarDetailBooking";

const S3_CAR_BASE = "https://car-image-bucket-2024.s3.ap-south-1.amazonaws.com/car";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetailPage({ params }: PageProps) {
  const { id } = await params;
  const carId = parseInt(id, 10);
  const car = cars.find((c) => c.car_id === carId);

  if (!car) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-display text-2xl text-white">Vehicle not found</h1>
            <Link href="/#fleet" className="mt-4 inline-block text-gold hover:underline">
              Back to fleet
            </Link>
          </div>
        </div>
      </>
    );
  }

  const galleryUrls = getCarGalleryImageUrls(car);
  const spin360Url = getSpin360Url(car);
  const fallbackImg = getCarImageUrl(car) || (car.img ? `${S3_CAR_BASE}/${car.img}` : undefined);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#fleet"
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold text-sm mb-8 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to fleet
          </Link>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <ProductCarousel
              imageUrls={galleryUrls}
              spin360Url={spin360Url}
              carTitle={car.title}
              fallbackImg={fallbackImg}
            />

            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
                {car.title}
              </h1>
              <p className="mt-2 text-white/70">Up to {car.capacity} seats</p>

              <div className="mt-8">
                <CarDetailBooking car={car} />
              </div>
            </div>
          </div>

          <div className="mt-14 lg:mt-16">
            <KeyFeatures car={car} />
          </div>

          <div className="mt-10">
            <PerformanceAndInterior car={car} />
          </div>

          {(car.description || car.section1_description || car.key_features) && (
            <div className="mt-10 rounded-2xl border border-white/10 bg-charcoal/40 p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold text-gold mb-4">Overview</h2>
              <div className="max-w-none text-white/85 leading-relaxed space-y-4">
                {car.description && <p>{car.description}</p>}
                {car.section1_description && <p>{car.section1_description}</p>}
                {car.key_features && <p>{car.key_features}</p>}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
