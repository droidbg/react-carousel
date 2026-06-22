import { ImageSlider } from "../lib";
import { Section } from "../components/Section";
import { Demo } from "../components/Demo";
import { photoSlides } from "../data";
import { IMAGE_CODE } from "../snippets";

export function ImageShowcase() {
  return (
    <Section id="image" num="07 / Presets" title="Image slider">
      <p className="lead">Full-bleed images with a centered caption, thin overlaid arrows, and overlaid dots. Built on the headless <code>Carousel</code>, so keyboard, swipe, and autoplay come for free.</p>
      <Demo code={IMAGE_CODE}>
        <ImageSlider slides={photoSlides} loop autoplay autoplayInterval={4000} height={460} />
      </Demo>
    </Section>
  );
}
