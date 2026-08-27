import { createFileRoute } from "@tanstack/react-router";
import { CardGrid, DataTable, Faq, PageHero, PromoBox, Section } from "../components/site/ui";

const TITLE = "1win Bonuses and Promo Codes for India 2026";
const DESCRIPTION =
  "All 1Win bonuses for Indian players: 500% welcome package up to 170,000 INR, cashback, express booster, free spins and wagering requirements.";

export const Route = createFileRoute("/bonuses")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/bonuses" },
    ],
    links: [{ rel: "canonical", href: "/bonuses" }],
  }),
  component: BonusesPage,
});

function BonusesPage() {
  return (
    <>
      <PageHero
        title="1win Bonuses and Promotions"
        intro="New players receive up to 500% across their first four deposits, while regular customers get cashback, an express booster and weekly casino offers."
      >
        <PromoBox />
      </PageHero>

      <Section title="Welcome Package">
        <DataTable
          rows={[
            ["1st deposit", "+200% bonus"],
            ["2nd deposit", "+150% bonus"],
            ["3rd deposit", "+100% bonus"],
            ["4th deposit", "+50% bonus"],
            ["Maximum amount", "170,000 INR in total"],
            ["Minimum deposit", "300 INR"],
            ["Bonus type", "Separate casino bonus balance"],
          ]}
        />
        <p>
          The bonus amount is credited to a separate balance and gradually transferred to
          the main account as you play eligible casino games.
        </p>
      </Section>

      <Section title="Regular Promotions">
        <CardGrid
          items={[
            {
              title: "Casino cashback",
              text: "Up to 30% weekly cashback on net losses in slots, depending on your activity level.",
            },
            {
              title: "Express booster",
              text: "Add 5 or more selections to an accumulator and increase the total odds by up to 15%.",
            },
            {
              title: "Free spins",
              text: "Regular free spin drops on featured slots from Pragmatic Play and BGaming.",
            },
            {
              title: "Lucky Jet promo",
              text: "Special crash-game tournaments with prize pools shared between top players.",
            },
            {
              title: "Leaderboards",
              text: "Daily and weekly casino tournaments with cash prizes and bonus rewards.",
            },
            {
              title: "Loyalty rewards",
              text: "Personal offers, birthday bonuses and improved cashback for long-term players.",
            },
          ]}
        />
      </Section>

      <Section title="Wagering Rules">
        <ul>
          <li>Bonus funds must be wagered before withdrawal;</li>
          <li>Sports bonuses require accumulators with odds of at least 3.00 per selection;</li>
          <li>Casino bonus contribution differs between slots and live games;</li>
          <li>Only one active bonus is allowed at a time;</li>
          <li>The standard bonus validity period is 30 days from activation.</li>
        </ul>
      </Section>

      <Section title="Bonus FAQ">
        <Faq
          items={[
            {
              q: "Do I need a promo code for the welcome bonus?",
              a: "The base package is available without a code, but a promo code can increase the bonus percentage and add free spins.",
            },
            {
              q: "Can I withdraw the bonus immediately?",
              a: "No, bonus funds must be wagered according to the terms before they can be transferred to the main balance.",
            },
            {
              q: "Why did my bonus disappear?",
              a: "Bonuses expire after the validity period or can be cancelled if the wagering rules are violated.",
            },
          ]}
        />
      </Section>
    </>
  );
}
