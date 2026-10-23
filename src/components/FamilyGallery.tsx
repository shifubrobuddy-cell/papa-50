import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { birthdayContent, GalleryPhoto } from '../content';

interface Props {
  isUrdu: boolean;
}

export const FamilyGallery: React.FC<Props> = ({ isUrdu }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % birthdayContent.gallery.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        (selectedPhotoIndex - 1 + birthdayContent.gallery.length) % birthdayContent.gallery.length
      );
    }
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
          <Camera className="w-3.5 h-3.5 text-amber-400" />
          <span>Treasured Moments</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
          Family Polaroid Gallery
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          Snapshots of joy, companionship, and the blessed moments we hold dearest. Tap any photo to expand.
        </p>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6 pt-4">
        {birthdayContent.gallery.map((photo: GalleryPhoto, index: number) => (
          <div
            key={photo.id}
            onClick={() => openLightbox(index)}
            className="group relative cursor-pointer transition-all duration-300 hover:z-20 hover:scale-105"
            style={{
              transform: `rotate(${photo.rotation}deg)`,
            }}
          >
            {/* Scotch tape effect at the top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-20 h-5 bg-white/20 backdrop-blur-xs border border-white/30 rotate-1 shadow-xs pointer-events-none" />

            {/* Polaroid Paper Frame */}
            <div className="bg-[#fcfaf7] p-3 pb-5 rounded-md shadow-[0_12px_30px_rgba(0,0,0,0.5)] border border-stone-200/80 transition-shadow group-hover:shadow-[0_16px_40px_rgba(245,158,11,0.25)]">
              {/* Photo Viewport - 4:5 Portrait to show faces clearly */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xs bg-stone-900 mb-3 shadow-inner">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover object-[center_12%] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Polaroid Handwritten Style Label */}
              <div className="text-center px-1">
                <p className="font-handwriting text-stone-900 text-lg sm:text-xl font-bold leading-tight">
                  {isUrdu && photo.captionUrdu ? photo.captionUrdu : photo.caption}
                </p>
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-sans font-semibold mt-1 block">
                  {photo.dateOrTag}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous / Next buttons */}
          <button
            onClick={prevPhoto}
            className="absolute left-3 sm:left-6 z-50 p-3 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-3 sm:right-6 z-50 p-3 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Photo Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full max-h-[85vh] flex flex-col items-center bg-[#0d071a] p-3 sm:p-5 rounded-2xl border border-amber-500/30 shadow-2xl"
          >
            <img
              src={birthdayContent.gallery[selectedPhotoIndex].src}
              alt={birthdayContent.gallery[selectedPhotoIndex].alt}
              className="max-h-[65vh] w-auto max-w-full rounded-xl object-contain shadow-md"
            />
            
            <div className="mt-4 text-center max-w-lg">
              <p className="font-serif text-lg sm:text-xl font-bold text-amber-200 mb-1">
                {isUrdu && birthdayContent.gallery[selectedPhotoIndex].captionUrdu
                  ? birthdayContent.gallery[selectedPhotoIndex].captionUrdu
                  : birthdayContent.gallery[selectedPhotoIndex].caption}
              </p>
              <span className="text-xs text-slate-400">
                {birthdayContent.gallery[selectedPhotoIndex].dateOrTag} • Photo {selectedPhotoIndex + 1} of {birthdayContent.gallery.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
