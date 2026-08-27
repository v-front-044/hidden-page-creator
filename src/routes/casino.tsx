import { createFileRoute } from "@tanstack/react-router";
import { CardGrid, Faq, PageHero, Section } from "../components/site/ui";

const TITLE = "1win Casino India: Slots, Live Dealers and Crash Games";
const DESCRIPTION =
  "Explore the 1Win online casino for India — thousands of slots, live dealer tables, Aviator and Lucky Jet crash games, plus Indian classics like Teen Patti.";

export const Route = createFileRoute("/casino")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/casino" },
    ],
    links: [{ rel: "canonical", href: "/casino" }],
  }),
  component: CasinoPage,
});

const PROVIDERS = [
  "Evolution Gaming",
  "Pragmatic Play",
  "Spribe",
  "Ezugi",
  "Play'nGO",
  "BGaming",
  "Microgaming",
  "NetEnt",
  "Playson",
  "Quickspin",
  "Habanero",
  "Booongo",
];

function CasinoPage() {
  return (
    <>
      <PageHero
        title="1win Online Casino for Indian Players"
        intro="The casino section combines more than 10,000 titles from 120+ providers: classic slots, jackpot games, live dealer studios and instant crash games."
      />

      <Section title="Game Categories">
        <CardGrid
          items={[
            {
              title: "Slots",
              text: "Thousands of video slots with free spins, megaways and progressive jackpots.",
            },
            {
              title: "Live casino",
              text: "Real dealers streaming roulette, blackjack, baccarat and game shows around the clock.",
            },
            {
              title: "Crash games",
              text: "Aviator, Lucky Jet, JetX and Spaceman with cash-out multipliers and auto-bet.",
            },
            {
              title: "Indian games",
              text: "Teen Patti, Andar Bahar and Indian Roulette hosted by Hindi-speaking dealers.",
            },
            {
              title: "Table games",
              text: "Poker variations, blackjack, baccarat and craps in RNG format.",
            },
            {
              title: "1Win Games",
              text: "In-house originals such as Mines, Plinko and Dice with provably fair mechanics.",
            },
          ]}
        />
      </Section>

      <Section title="Software Providers">
        <div className="mt-4 flex flex-wrap gap-2">
          {PROVIDERS.map((provider) => (
            <span
              key={provider}
              className="surface-card px-3 py-2 text-sm text-muted-foreground"
            >
              {provider}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Demo Mode and RTP">
        <p>
          Most slots are available in demo mode, so you can test volatility and bonus
          features without risking real money. The average RTP across the catalogue ranges
          from 95% to 97%, and every title displays its return rate in the game info panel.
        </p>
        <ul>
          <li>Filter games by provider, feature or popularity;</li>
          <li>Add favourite titles to a personal collection;</li>
          <li>Live tables show betting limits before you join;</li>
          <li>Crash games support auto cash-out strategies.</li>
        </ul>
      </Section>

      <Section title="Casino FAQ">
        <Faq
          items={[
            {
              q: "Can I play casino games in the mobile app?",
              a: "Yes, the whole catalogue including live dealer tables is available in the Android and iOS apps.",
            },
            {
              q: "Are the games fair?",
              a: "Titles come from licensed studios and use certified random number generators; in-house games use provably fair algorithms.",
            },
            {
              q: "What is the minimum bet in slots?",
              a: "Minimum bets typically start from around 10 INR depending on the game.",
            },
          ]}
        />
      </Section>
    </>
  );
}
