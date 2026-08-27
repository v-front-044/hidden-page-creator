import { createFileRoute } from "@tanstack/react-router";
import { CardGrid, DataTable, Faq, PageHero, Section, Steps } from "../components/site/ui";

const TITLE = "1win Cricket Betting: IPL, T20 World Cup Odds and Markets";
const DESCRIPTION =
  "Bet on cricket at 1Win India: IPL and ICC T20 World Cup odds, top batsman and total runs markets, live betting and cash out explained.";

export const Route = createFileRoute("/cricket-betting")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/cricket-betting" },
    ],
    links: [{ rel: "canonical", href: "/cricket-betting" }],
  }),
  component: CricketPage,
});

function CricketPage() {
  return (
    <>
      <PageHero
        title="Cricket Betting at 1win India"
        intro="Cricket is the flagship discipline for Indian bettors. 1Win covers domestic and international tournaments with deep markets, live odds and streaming."
      />

      <Section title="Available Cricket Competitions">
        <ul>
          <li>Indian Premier League (IPL);</li>
          <li>ICC T20 World Cup;</li>
          <li>India. NSK Trophy State T20;</li>
          <li>Twenty20 international series;</li>
          <li>Women. Twenty20 series;</li>
          <li>Cool and Smooth T10;</li>
          <li>The Ashes and other Test series.</li>
        </ul>
      </Section>

      <Section title="Popular Cricket Markets">
        <CardGrid
          items={[
            {
              title: "Match winner",
              text: "The classic bet on the team you believe will win the game.",
            },
            {
              title: "Top batsman",
              text: "Predict which player scores the most runs in the match or innings.",
            },
            {
              title: "Total runs",
              text: "Over/under on total runs in the match, an innings or a specific over.",
            },
            {
              title: "Wickets",
              text: "Number of wickets that fall within a given period or by a chosen bowler.",
            },
            {
              title: "Handicap",
              text: "Run handicaps that even out the odds between favourites and outsiders.",
            },
            {
              title: "Specials",
              text: "Toss winner, method of dismissal, sixes and boundaries markets.",
            },
          ]}
        />
      </Section>

      <Section title="Typical Odds and Limits">
        <DataTable
          rows={[
            ["Margin on IPL matches", "About 5–6%"],
            ["Markets per top match", "150+"],
            ["Live betting", "Available with in-play odds updates"],
            ["Live streaming", "Selected tournaments"],
            ["Cash out", "Available on most pre-match single bets"],
            ["Minimum bet", "From 30 INR"],
          ]}
        />
      </Section>

      <Section title="How to Bet on Cricket">
        <Steps
          items={[
            "Log in and open the Sports section, then choose Cricket.",
            "Pick a tournament such as the IPL and open the match card.",
            "Study the statistics, pitch report and team news.",
            "Click the odds to add a selection to the bet slip.",
            "Enter your stake and confirm the bet.",
          ]}
        />
      </Section>

      <Section title="Cricket Betting FAQ">
        <Faq
          items={[
            {
              q: "Can I bet live during an IPL match?",
              a: "Yes, in-play markets update after every over with adjusted odds and new specials.",
            },
            {
              q: "What happens if a match is abandoned?",
              a: "Bets on abandoned matches are usually voided and stakes returned, according to the operator's rules.",
            },
            {
              q: "Is cash out available for accumulators?",
              a: "Cash out is mainly offered on single pre-match bets; availability for accumulators depends on the event.",
            },
          ]}
        />
      </Section>
    </>
  );
}
