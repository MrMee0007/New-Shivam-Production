import { useState } from "react";
import "./DestinationSlider.css";

const destinations = [
  {
    name: "Scotland",
    description:
      "Experience the mystical Highlands under twilight skies and misty lochs.",
    image:
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1074&auto=format&fit=crop",
    link: "https://www.visitscotland.com/",
  },
  {
    name: "Norway",
    description:
      "Chase the Northern Lights under star-lit skies along scenic fjord roads.",
    image:
      "https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?q=80&w=1173&auto=format&fit=crop",
    link: "https://www.visitnorway.com/",
  },
  {
    name: "New Zealand",
    description:
      "Wander dramatic, mist-laden mountain paths that feel straight out of a dream.",
    image:
      "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=1170&auto=format&fit=crop",
    link: "https://www.newzealand.com/",
  },
  {
    name: "Japan",
    description:
      "Discover serene mountain temples shrouded in dusk and ancient forest trails.",
    image:
      "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop",
    link: "https://www.japan.travel/",
  },
];

export default function DestinationSlider() {
  const [items, setItems] = useState(destinations);

  const nextSlide = () => {
    setItems((current) => [...current.slice(1), current[0]]);
  };

  const prevSlide = () => {
    setItems((current) => [
      current[current.length - 1],
      ...current.slice(0, -1),
    ]);
  };

  return (
    <section className="destination-section">
      <div className="destination-heading">
        <span className="destination-eyebrow">
          DISCOVER SOMETHING NEW
        </span>

        <h2>
          Explore the <span>extraordinary.</span>
        </h2>

        <p>
          Discover breathtaking destinations and unforgettable experiences.
        </p>
      </div>

      <div className="destination-slider">
        <div className="destination-slides">
          {items.map((destination, index) => (
            <article
              className="destination-item"
              key={destination.name}
              style={{
                backgroundImage: `url("${destination.image}")`,
              }}
            >
              <div className="destination-overlay" />

              {index === 1 && (
                <div
                  className="destination-content"
                  key={destination.name}
                >
                  <span className="destination-number">
                    {String(
                      destinations.findIndex(
                        (item) => item.name === destination.name
                      ) + 1
                    ).padStart(2, "0")}
                  </span>

                  <h3>{destination.name}</h3>

                  <p>{destination.description}</p>

                  <a
                    className="destination-see-more"
                    href={destination.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discover destination
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="destination-controls">
          <button
            type="button"
            className="destination-control"
            onClick={prevSlide}
            aria-label="Previous destination"
          >
            ←
          </button>

          <span className="destination-control-label">
            DISCOVER MORE
          </span>

          <button
            type="button"
            className="destination-control"
            onClick={nextSlide}
            aria-label="Next destination"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
