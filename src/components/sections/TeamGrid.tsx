import Image from "next/image";
import { salon } from "@/config/salon";
import { Reveal } from "@/components/ui/Reveal";

/** Team portraits reveal one after another. Replace the portraits in /public/images/team. */
export function TeamGrid() {
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {salon.team.map((member, i) => (
        <Reveal as="li" key={member.name} variant="image" delay={i * 150}>
          <article className="group overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={member.image.src}
                alt={member.image.alt}
                width={member.image.width}
                height={member.image.height}
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                className="size-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold">{member.name}</h3>
              <p className="text-sm font-semibold tracking-wide text-gold uppercase">{member.role}</p>
              <p className="mt-3 text-ink-soft">{member.bio}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}
