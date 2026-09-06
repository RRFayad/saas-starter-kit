import {
  CheckIcon,
  LayersIcon,
  RocketIcon,
  SparklesIcon,
  StarIcon,
  ZapIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HeroMockup } from "@/components/marketing/hero-mockup";
import { IntegrationsBeam } from "@/components/marketing/integrations-beam";
import { AnimatedGradientText } from "@/components/velora/animated-gradient-text";
import { AuroraBackground } from "@/components/velora/aurora-background";
import { AvatarCircles } from "@/components/velora/avatar-circles";
import { BlurFade } from "@/components/velora/blur-fade";
import { BorderBeam } from "@/components/velora/border-beam";
import { GridPattern } from "@/components/velora/grid-pattern";
import { NumberTicker } from "@/components/velora/number-ticker";
import { Particles } from "@/components/velora/particles";
import { ScrollProgress } from "@/components/velora/scroll-progress";
import { ShimmerButton } from "@/components/velora/shimmer-button";
import { SpotlightCard } from "@/components/velora/spotlight-card";
import { TextReveal } from "@/components/velora/text-reveal";
import { TiltCard } from "@/components/velora/tilt-card";
import { Typewriter } from "@/components/velora/typewriter";

const stats = [
  { value: 8, suffix: "h", prefix: "", label: "saved with payments" },
  { value: 4, suffix: "h", prefix: "", label: "saved with login" },
  { value: 4, suffix: "h", prefix: "", label: "saved with database" },
  { value: 2, suffix: "h", prefix: "", label: "saved with styling" },
];

const testimonials = [
  {
    quote: "Add some customer review here",
    name: "Customer Name",
    role: "Customer role, Company",
  },
  {
    quote: "Add some customer review here",
    name: "Customer Name",
    role: "Customer role, Company",
  },
  {
    quote: "Add some customer review here",
    name: "Customer Name",
    role: "Customer role, Company",
  },
  {
    quote: "Add some customer review here",
    name: "Customer Name",
    role: "Customer role, Company",
  },
  {
    quote: "Add some customer review here",
    name: "Customer Name",
    role: "Customer role, Company",
  },
  {
    quote: "Add some customer review here",
    name: "Customer Name",
    role: "Customer role, Company",
  },
];

const faqs = [
  {
    q: "What is included in the starter?",
    a: "Authentication, user synchronization, subscriptions, authorization, billing management, PostgreSQL persistence, a FastAPI backend, and a responsive SaaS UI — already integrated and ready to extend.",
  },
  {
    q: "Why Next.js and FastAPI?",
    a: "Next.js handles the web application and SaaS infrastructure, while FastAPI provides a dedicated Python backend for product and domain logic. This keeps the stack flexible and provides a natural foundation for Python-based AI applications.",
  },
  {
    q: "How does authentication work?",
    a: "Clerk handles authentication and user management. Clerk webhooks synchronize users with PostgreSQL, and authenticated requests to FastAPI are validated using Clerk tokens.",
  },
  {
    q: "How are subscriptions handled?",
    a: "Stripe handles Checkout and billing, while webhooks synchronize the current subscription state with PostgreSQL. The application uses that local state for authorization instead of querying Stripe on every request.",
  },
  {
    q: "Can I use it for AI applications?",
    a: "Yes. The FastAPI backend provides a natural place for Python-based AI and product logic. AI-specific infrastructure such as LangChain, LangGraph, conversations, streaming, and usage tracking is planned separately rather than being bundled into the core SaaS foundation.",
  },
];

const freeFeatures = [
  "32+ animated components",
  "Complete SaaS landing template",
  "Dark mode + full accessibility",
  "MIT license — commercial use OK",
  "Community support",
];

const proFeatures = [
  "5 niche templates (AI, dev tool, mobile…)",
  "50+ section design variants",
  "Figma source file",
  "Waitlist, newsletter & Stripe wiring",
  "Private registry + lifetime updates",
];

const LandingPage = () => {
  return (
    <main className="relative">
      <ScrollProgress />

      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-24 lg:pt-48 lg:pb-28">
        <AuroraBackground intensity="subtle" />
        <GridPattern
          width={48}
          height={48}
          className="fill-transparent stroke-border/60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 text-center lg:px-8">
          <BlurFade delay={0} direction="down">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-sm backdrop-blur">
              <SparklesIcon className="size-3.5 text-primary" />
              <span className="font-medium">Full-Stack SaaS Starter Kit</span>
            </span>
          </BlurFade>

          <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-semibold tracking-tight text-balance lg:text-7xl">
            <TextReveal text="Everything you need to build your SaaS." /> <br />
            <TextReveal text="Build" />{" "}
            <AnimatedGradientText>
              <Typewriter words={["faster.", "smarter.", "better."]} />
            </AnimatedGradientText>
          </h1>

          <BlurFade delay={0.35}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
              A production-ready foundation with Next.js, FastAPI, PostgreSQL,
              Clerk, and Stripe — authentication, subscriptions, database
              synchronization, and backend integration already set up.
            </p>
          </BlurFade>

          <BlurFade delay={0.5}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ShimmerButton>
                <RocketIcon className="size-4" />
                View Live Demo
              </ShimmerButton>
              <Button variant="ghost" size="lg" asChild>
                <a href="#features">View on Github</a>
              </Button>
            </div>
          </BlurFade>

          <BlurFade delay={0.6}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <AvatarCircles
                people={[
                  "Maya Chen",
                  "Tom Okafor",
                  "Sofia Lindqvist",
                  "Dan Romero",
                  "Aisha Patel",
                ]}
                extra={100}
              />
              <div className="flex flex-col items-center gap-0.5 sm:items-start">
                <span className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="size-4 fill-current" />
                  ))}
                </span>
                <span className="text-sm text-muted-foreground">
                  Social proof disclaimer
                </span>
              </div>
            </div>
          </BlurFade>

          {/* Product mockup */}
          <BlurFade delay={0.75} offset={32}>
            <HeroMockup className="mt-20" />
          </BlurFade>

          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <BlurFade key={stat.label} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-4xl font-semibold tracking-tight">
                    <NumberTicker
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations beam */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <BlurFade direction="right">
            <div>
              <span className="text-sm font-medium text-primary">
                Full-stack foundation
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance lg:text-4xl">
                Your SaaS infrastructure,{" "}
                <span className="text-primary">already connected.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Skip the repetitive setup. Authentication, billing, persistence,
                and your application backend are already integrated — so you can
                focus on building the product.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Authentication ready — Clerk auth synchronized with PostgreSQL.",
                  "Billing built in — Stripe subscriptions, webhooks, and Customer Portal.",
                  "Python backend — FastAPI connected to Next.js and PostgreSQL.",
                  "Database ready — PostgreSQL with Drizzle and SQLAlchemy.",
                  "Modern UI — shadcn/ui,  Velora components and Tailwind CSS.",
                  "AI-ready architecture — Python foundation ready for your AI stack.",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <CheckIcon className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>
          <BlurFade direction="left" delay={0.15}>
            <IntegrationsBeam />
          </BlurFade>
        </div>
      </section>

      {/* Spotlight cards */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <RocketIcon className="size-6" />,
                title: "Built for real SaaS",
                body: "Authentication, subscriptions, authorization, webhooks, and user synchronization — implemented as real production flows, not mocked examples.",
              },
              {
                icon: <LayersIcon className="size-6" />,
                title: "Full-stack by design",
                body: "Next.js owns the SaaS layer. FastAPI owns your product logic. Both share PostgreSQL with clear domain boundaries.",
              },
              {
                icon: <ZapIcon className="size-6" />,
                title: "Made to be cloned",
                body: "Standard technologies, minimal abstractions, and a focused foundation designed to become your next product — not another framework to learn.",
              },
            ].map((card, i) => (
              <BlurFade key={card.title} delay={i * 0.12}>
                <SpotlightCard className="h-full p-8">
                  <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3 text-primary">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {card.body}
                  </p>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <BlurFade>
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-balance lg:text-5xl">
              What customers <span className="text-primary">are saying</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
              A ready-to-customize testimonial section for customer stories,
              reviews, and social proof.
            </p>
          </BlurFade>
          <div className="mt-16 columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6">
            {testimonials.map((t, i) => (
              <BlurFade
                key={`${i}_${t.name}`}
                delay={(i % 3) * 0.1}
                className="break-inside-avoid"
              >
                <TiltCard>
                  <figure className="rounded-2xl border bg-card p-6">
                    <span className="flex gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <StarIcon key={s} className="size-3.5 fill-current" />
                      ))}
                    </span>
                    <blockquote className="mt-4 text-sm text-card-foreground">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-3">
                      <AvatarCircles
                        people={[t.name]}
                        className="[&>span]:size-8 [&>span]:text-[10px]"
                      />
                      <div>
                        <p className="text-sm font-medium">{t.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {t.role}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </TiltCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <BlurFade>
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-balance lg:text-5xl">
              Plans built for{" "}
              <span className="text-primary">your product.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
              Customizable plans already wired to real Stripe data - Checkout,
              webhooks, subscription synchronization, and billing
              management.{" "}
            </p>
          </BlurFade>

          <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
            <BlurFade>
              <div className="flex h-full flex-col rounded-2xl border bg-card p-8">
                <h3 className="text-lg font-semibold">Free</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Everything you see in this showcase.
                </p>
                <p className="mt-6 text-5xl font-semibold tracking-tight">
                  $0
                  <span className="text-base font-normal text-muted-foreground">
                    {" "}
                    forever
                  </span>
                </p>
                <ul className="mt-8 flex-1 space-y-3 text-sm">
                  {freeFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <CheckIcon className="size-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  size="lg"
                  className="mt-8 w-full rounded-full"
                >
                  Get started
                </Button>
              </div>
            </BlurFade>

            <BlurFade delay={0.12}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-8">
                <BorderBeam size={80} duration={8} />
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-primary">Pro</h3>
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                    Coming soon
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  For teams shipping more than one page.
                </p>
                <p className="mt-6 text-5xl font-semibold tracking-tight">
                  $99
                  <span className="text-base font-normal text-muted-foreground">
                    {" "}
                    lifetime
                  </span>
                </p>
                <ul className="mt-8 flex-1 space-y-3 text-sm">
                  {proFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <CheckIcon className="size-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <ShimmerButton className="mt-8 w-full">
                  Join the waitlist
                </ShimmerButton>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <BlurFade>
            <h2 className="text-center text-3xl font-semibold tracking-tight lg:text-4xl">
              Frequently asked questions
            </h2>
          </BlurFade>
          <BlurFade delay={0.15}>
            <Accordion type="single" collapsible className="mt-12">
              {faqs.map((faq) => (
                <AccordionItem key={faq.q} value={faq.q}>
                  <AccordionTrigger className="text-left text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </BlurFade>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <AuroraBackground intensity="subtle" />
        <Particles quantity={50} />
        <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
          <BlurFade>
            <h2 className="text-4xl font-semibold tracking-tight text-balance lg:text-6xl">
              Start with the foundation.{" "}
              <span className="text-primary">Focus on what matters.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Skip the repetitive SaaS setup and start with authentication,
              billing, persistence, and backend integration already connected.
            </p>
            <div className="mt-10">
              <ShimmerButton className="h-14 px-10 text-base">
                <RocketIcon className="size-5" />
                View Live Demo
              </ShimmerButton>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
