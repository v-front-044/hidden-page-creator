import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CardGrid,
  DataTable,
  Faq,
  PageHero,
  PromoBox,
  Section,
  Steps,
} from "../components/site/ui";
import spaceman from "../assets/games/spaceman.jpg";
import pinataWins from "../assets/games/pinata-wins.jpg";
import fortuneMouse from "../assets/games/fortune-mouse.jpg";
import hotFiesta from "../assets/games/hot-fiesta.jpg";
import bigBassCrash from "../assets/games/big-bass-crash.jpg";
import fortuneDragon from "../assets/games/fortune-dragon.jpg";
import luckyJet from "../assets/games/lucky-jet.jpg";
import aviator from "../assets/games/aviator.jpg";
import gatesOfOlympus from "../assets/games/gates-of-olympus.jpg";
import sweetBonanza from "../assets/games/sweet-bonanza.jpg";
import jetx from "../assets/games/jetx.jpg";
import plinko from "../assets/games/plinko.jpg";

const TITLE = "1win Login – Official Casino and Sports Betting Site in India";
const DESCRIPTION =
  "1Win India review: 500% welcome bonus up to 170,000 INR, casino games, cricket betting, mobile app, registration and UPI payments.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const GAMES: { name: string; img: string }[] = [
  { name: "Spaceman", img: spaceman },
  { name: "Pinata Wins", img: pinataWins },
  { name: "Fortune Mouse", img: fortuneMouse },
  { name: "Hot Fiesta", img: hotFiesta },
  { name: "Big Bass Crash", img: bigBassCrash },
  { name: "Fortune Dragon", img: fortuneDragon },
  { name: "Lucky Jet", img: luckyJet },
  { name: "Aviator", img: aviator },
  { name: "Gates of Olympus", img: gatesOfOlympus },
  { name: "Sweet Bonanza", img: sweetBonanza },
  { name: "JetX", img: jetx },
  { name: "Plinko", img: plinko },
];

function HomePage() {
  return (
    <>
      <PageHero
        title={TITLE}
        intro="1Win is an in-demand bookmaker website with a casino among Indian players, offering a variety of sports disciplines and online games. Get 500% on four first deposits up to 170,000 INR and other generous promotions."
      >
        <PromoBox />
      </PageHero>

      <Section title="Popular Games">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {GAMES.map((game) => (
            <Link
              key={game.name}
              to="/casino"
              className="surface-card group block overflow-hidden transition-transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={game.img}
                  alt={`${game.name} game at 1win casino`}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="h-28 w-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-background/70 text-xs font-bold uppercase tracking-wide text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  Play now
                </span>
              </div>
              <p className="p-3 text-center text-sm text-foreground">{game.name}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Information About the 1win Bookmaker">
        <p>
          1Win has been in the industry for over 10 years, establishing itself as a
          reliable betting option for Indian players. The site operates under an
          international license, ensuring compliance with strict regulatory standards.
        </p>
        <p>
          1Win promotes responsible gambling and provides dedicated resources on this
          topic. Players can access various tools, including self-exclusion, to manage
          their betting activities responsibly.
        </p>
        <DataTable
          rows={[
            ["Company", "MFI Investments Ltd"],
            ["Year", "2016"],
            ["Languages", "English, Hindi, +17"],
            [
              "Available Categories",
              "Sports Betting, Slots, Table Games, Live Casino, and others",
            ],
            [
              "Providers",
              "Evolution Gaming, Pragmatic Play, Spribe, Ezugi, Play'nGO, BGAMING, NetEnt, and +120",
            ],
            ["Welcome Bonus", "500% on four first deposits up to 170,000 INR"],
            [
              "Payment Methods",
              "Net Banking, UPI, Paytm, Skrill, Neteller, Cryptocurrency",
            ],
            ["Customer Support", "24/7 Live Chat, Email Support, FAQ"],
            ["Mobile Compatibility", "iOS, Android (mobile app available)"],
            ["Licensing", "Curacao, № 8048/JAZ 2018-040"],
            ["Security", "SSL Encryption, Secure Payment Processing"],
          ]}
        />
      </Section>

      <Section title="1win Registration: A Guide for New Players">
        <p>
          To join, players must create an account. Below is a short guide on how to
          register a new profile at the bookmaker.
        </p>
        <Steps
          items={[
            "Visit the official website and open 1Win via any web browser.",
            "Click the 'Registration' button in the upper part of the page.",
            "Fill out the form by phone, email or a social network account.",
            "Read the terms and regulations and tick the confirmation checkbox.",
            "Check the entered data and complete the registration procedure.",
          ]}
        />
        <p className="mt-4">
          A detailed walkthrough with verification tips is available on the{" "}
          <Link to="/registration" className="text-primary underline">
            registration page
          </Link>
          .
        </p>
      </Section>

      <Section title="Sports Betting at 1Win">
        <p>
          With a comprehensive sports betting section, 1Win India extends its scope beyond
          casino offerings. Bettors can find over 20 sports, and an average football match
          features at least 50 betting markets.
        </p>
        <CardGrid
          items={[
            {
              title: "Cricket",
              text: "IPL, ICC T20 World Cup, NSK Trophy State T20, T10 leagues and women's series.",
            },
            {
              title: "Football",
              text: "Premier League, La Liga, UEFA Champions League, Europa League and Indian leagues.",
            },
            {
              title: "Tennis",
              text: "Over 100 matches daily including Australian Open, Wimbledon and Roland Garros.",
            },
            {
              title: "Basketball",
              text: "NBA, EuroLeague and ABA League with totals and player performance markets.",
            },
            {
              title: "Esports",
              text: "Dota 2, Counter-Strike 2, VALORANT, League of Legends and 10+ disciplines.",
            },
            {
              title: "Other sports",
              text: "Baseball, boxing, horse racing, kabaddi, volleyball and table tennis.",
            },
          ]}
        />
      </Section>

      <Section title="How to Make a 1win Bet?">
        <Steps
          items={[
            "Select the 'Pre-match Betting' or 'Live Betting' tab.",
            "Decide on the sport and the tournament.",
            "Check out the list of games and events available for betting.",
            "Click on the odds to add your selection to the bet slip.",
            "Enter the stake and confirm with the 'Place Bet' button.",
          ]}
        />
      </Section>

      <Section title="Frequently Asked Questions">
        <Faq
          items={[
            {
              q: "Is 1Win legal for players from India?",
              a: "The platform operates under a Curacao license and accepts registrations from India, where online betting on offshore sites is not prohibited at the federal level.",
            },
            {
              q: "What is the minimum deposit?",
              a: "The minimum deposit starts from 300 INR depending on the selected payment method.",
            },
            {
              q: "Can I use INR as an account currency?",
              a: "Yes, Indian rupees are supported, so you avoid conversion fees on deposits and withdrawals.",
            },
            {
              q: "How long do withdrawals take?",
              a: "UPI and Net Banking payouts usually arrive within a few hours, crypto withdrawals are typically faster.",
            },
          ]}
        />
      </Section>
    </>
  );
}
