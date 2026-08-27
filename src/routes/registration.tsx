import { createFileRoute } from "@tanstack/react-router";
import { CardGrid, Faq, PageHero, PromoBox, Section, Steps } from "../components/site/ui";

const TITLE = "1win Registration and Login for Indian Players";
const DESCRIPTION =
  "Step-by-step 1Win registration guide for India: sign up by phone, email or social network, verify your account and log in from any device.";

export const Route = createFileRoute("/registration")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/registration" },
    ],
    links: [{ rel: "canonical", href: "/registration" }],
  }),
  component: RegistrationPage,
});

function RegistrationPage() {
  return (
    <>
      <PageHero
        title="1win Registration: A Guide for New Players"
        intro="Creating an account takes about a minute. Choose a sign-up method, confirm the terms and claim the welcome package on your first four deposits."
      >
        <PromoBox />
      </PageHero>

      <Section title="How to Create an Account">
        <Steps
          items={[
            "Navigate to the 1Win website via any web browser.",
            "Click the 'Registration' button in the upper part of the page.",
            "Choose registration by phone number, email or social network.",
            "Select INR as your account currency and enter the promo code.",
            "Tick the checkbox confirming the rules and regulations.",
            "Confirm your data and finish the registration procedure.",
          ]}
        />
      </Section>

      <Section title="Registration Methods">
        <CardGrid
          items={[
            {
              title: "By phone number",
              text: "Enter your Indian mobile number, pick a currency and receive a confirmation SMS code.",
            },
            {
              title: "By email",
              text: "Provide an email address and a strong password, then confirm via the link sent to your inbox.",
            },
            {
              title: "Via social networks",
              text: "One-click sign up through Google, Telegram or other supported accounts.",
            },
          ]}
        />
      </Section>

      <Section title="1win Login">
        <p>
          Once you already have a personal account, you can log in to 1Win from any
          device.
        </p>
        <Steps
          items={[
            "Open the main page of the 1Win website and select the 'Login' button.",
            "Provide your phone number or email address and the password.",
            "Click Sign In and start using your account.",
          ]}
        />
      </Section>

      <Section title="Account Verification">
        <p>
          Verification is required before your first large withdrawal. Prepare a photo of
          your Aadhaar card, PAN card or passport, plus a document confirming your address
          if requested. Documents are reviewed within 24–48 hours.
        </p>
        <ul>
          <li>Upload clear, uncropped colour scans of the whole document;</li>
          <li>Personal data must match the details in your profile;</li>
          <li>One account per player, family and IP address is allowed;</li>
          <li>Registration is only available for users aged 18 and over.</li>
        </ul>
      </Section>

      <Section title="Registration FAQ">
        <Faq
          items={[
            {
              q: "I forgot my password — what should I do?",
              a: "Use the 'Forgot password' link on the login form and reset it via the phone number or email linked to your account.",
            },
            {
              q: "Can I change the account currency later?",
              a: "No, the currency is selected during registration and cannot be changed afterwards.",
            },
            {
              q: "When should I enter the promo code?",
              a: "Enter it in the dedicated field during registration — it cannot be applied after the first deposit.",
            },
          ]}
        />
      </Section>
    </>
  );
}
