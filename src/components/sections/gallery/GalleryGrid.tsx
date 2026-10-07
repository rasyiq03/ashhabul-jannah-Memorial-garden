"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import type { GalleryImage } from "@/content/gallery";
import { cn } from "@/lib/cn";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [openIndex, setOpenIndex] = useState(0);
  const current = images[openIndex];

  function open(index: number) {
    setOpenIndex(index);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  function step(direction: 1 | -1) {
    setOpenIndex((index) => (index + direction + images.length) % images.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) close();
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {images.map((image, index) => (
          <li
            key={image.src}
            className={cn(
              index === 0 && "col-span-2 md:row-span-2",
              index === images.length - 1 && "col-span-2 md:col-span-1",
            )}
          >
            <button
              type="button"
              onClick={() => open(index)}
              className="group relative block h-full w-full overflow-hidden rounded-sm bg-sage-soft text-left"
              aria-label={`Perbesar gambar: ${image.caption}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={index === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
                className={cn(
                  "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]",
                  index === 0 ? "aspect-[4/3] md:aspect-auto" : "aspect-[4/3]",
                )}
              />
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/85 to-ink/0 px-3 pb-3 pt-10 text-sm font-medium text-cream sm:px-4 sm:text-[0.9375rem]">
                {image.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Galeri gambar"
        onKeyDown={handleKeyDown}
        onClick={handleBackdropClick}
        className="m-auto max-h-[92vh] w-[min(64rem,94vw)] overflow-visible bg-transparent p-0 backdrop:bg-ink/85"
      >
        {current ? (
          <figure className="on-dark flex flex-col">
            <div className="mb-3 flex items-center justify-between gap-4 text-cream">
              <p className="text-sm text-sage-200" aria-live="polite">
                {openIndex + 1} dari {images.length}
              </p>
              <button
                type="button"
                onClick={close}
                className="flex size-11 items-center justify-center rounded-sm border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-ink"
                aria-label="Tutup galeri"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="94vw"
              className="max-h-[70vh] w-full rounded-sm bg-sage-soft object-contain"
            />
            <div className="mt-3 flex items-center justify-between gap-4">
              <figcaption className="font-serif text-xl text-cream">{current.caption}</figcaption>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="flex size-11 items-center justify-center rounded-sm border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-ink"
                  aria-label="Gambar sebelumnya"
                >
                  <ChevronLeft aria-hidden="true" className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="flex size-11 items-center justify-center rounded-sm border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-ink"
                  aria-label="Gambar berikutnya"
                >
                  <ChevronRight aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>
          </figure>
        ) : null}
      </dialog>
    </>
  );
}
