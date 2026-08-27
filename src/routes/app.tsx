import { createFileRoute } from "@tanstack/react-router";
import { CardGrid, DataTable, Faq, PageHero, Section, Steps } from "../components/site/ui";

const TITLE = "1win App Download for Android APK and iOS in India";
const DESCRIPTION =
  "How to download and install the 1Win mobile app on Android and iOS in India: system requirements, APK installation steps and app features.";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/app" },
    ],
    links: [{ rel: "canonical", href: "/app" }],
  }),
  component: AppPage,
});

function AppPage() {
  return (
    <>
      <PageHero
        title="1win Mobile App for Android & iOS"
        intro="With the 1Win app, bettors from India can play casino games and bet on sports at any time. The software is free and includes all features of the desktop version."
      />

      <Section title="Android App (APK)">
        <p>
          The only safe source for the APK file is the official 1Win mobile site. Download
          and install it in a few clicks.
        </p>
        <Steps
          items={[
            "Open the official 1Win site in Chrome or any mobile browser.",
            "Scroll to the footer of the mobile site and tap the Android icon.",
            "Allow installation of files from unknown sources in security settings.",
            "Open the downloaded APK file and tap Install, then launch the app.",
          ]}
        />
      </Section>

      <Section title="iOS App">
        <Steps
          items={[
            "Open Safari and visit the official 1Win website.",
            "Go to the footer of the website and tap the iOS icon.",
            "Wait until the application fully downloads and installs.",
            "Tap the icon on your home screen to launch the app.",
          ]}
        />
      </Section>

      <Section title="System Requirements">
        <DataTable
          rows={[
            ["Android OS", "5.0 and higher"],
            ["iOS", "11.0 and higher"],
            ["APK size", "~65 MB"],
            ["RAM", "1 GB minimum"],
            ["Free space", "150 MB"],
            ["Internet", "3G / 4G / 5G / Wi-Fi"],
            ["Price", "Free"],
          ]}
        />
      </Section>

      <Section title="App Features">
        <CardGrid
          items={[
            {
              title: "Full betting line",
              text: "Pre-match and live markets for 20+ sports, including cricket and esports.",
            },
            {
              title: "Casino on the go",
              text: "Thousands of slots, crash games and live dealer tables optimised for touch.",
            },
            {
              title: "Fast payments",
              text: "UPI, Paytm and crypto deposits directly from the cashier inside the app.",
            },
            {
              title: "Push notifications",
              text: "Alerts about odds changes, bet results and personal promo offers.",
            },
            {
              title: "Lower data usage",
              text: "The app consumes less traffic than the mobile website on slow connections.",
            },
            {
              title: "Auto updates",
              text: "The app prompts you when a new version is available for download.",
            },
          ]}
        />
      </Section>

      <Section title="App FAQ">
        <Faq
          items={[
            {
              q: "Is the 1Win app free?",
              a: "Yes, both the Android APK and the iOS version are distributed free of charge.",
            },
            {
              q: "Why is the APK not installing?",
              a: "Enable installation from unknown sources in your Android security settings and make sure you have enough free storage.",
            },
            {
              q: "Do I need a separate account for the app?",
              a: "No, your website account works in the app with the same login and balance.",
            },
          ]}
        />
      </Section>
    </>
  );
}
