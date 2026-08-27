import { createFileRoute } from "@tanstack/react-router";
import { DataTable, Faq, PageHero, Section, Steps } from "../components/site/ui";

const TITLE = "1win Payment Methods India: UPI, Paytm and Crypto";
const DESCRIPTION =
  "Deposits and withdrawals at 1Win India — UPI, Paytm, Net Banking, Skrill, Neteller and cryptocurrency with limits, fees and processing times.";

export const Route = createFileRoute("/payment-methods")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/payment-methods" },
    ],
    links: [{ rel: "canonical", href: "/payment-methods" }],
  }),
  component: PaymentPage,
});

function PaymentPage() {
  return (
    <>
      <PageHero
        title="1win Payment Methods for Indian Players"
        intro="The cashier supports rupee payments through UPI, Paytm, Net Banking, e-wallets and cryptocurrency, with no commission from the bookmaker's side."
      />

      <Section title="Deposit Options">
        <DataTable
          rows={[
            ["UPI", "From 300 INR · instant · no fee"],
            ["Paytm", "From 300 INR · instant · no fee"],
            ["Net Banking", "From 500 INR · up to 15 minutes"],
            ["Skrill / Neteller", "From 500 INR · instant"],
            ["Bank cards (Visa/Mastercard)", "From 500 INR · instant"],
            ["Cryptocurrency (BTC, USDT, ETH)", "From equivalent of 300 INR · up to 30 min"],
          ]}
        />
      </Section>

      <Section title="Withdrawal Options">
        <DataTable
          rows={[
            ["UPI", "From 500 INR · a few hours"],
            ["Net Banking", "From 1,000 INR · up to 24 hours"],
            ["E-wallets", "From 500 INR · up to 12 hours"],
            ["Cryptocurrency", "From equivalent of 500 INR · up to 1 hour"],
            ["Maximum per transaction", "Depends on the method and verification status"],
            ["Verification", "Required before the first payout"],
          ]}
        />
      </Section>

      <Section title="How to Deposit">
        <Steps
          items={[
            "Log in to your account and open the cashier via the 'Deposit' button.",
            "Choose a convenient payment method, for example UPI.",
            "Enter the amount and apply a bonus code if you have one.",
            "Confirm the payment in your banking or wallet app.",
            "The balance is topped up and the bonus is credited automatically.",
          ]}
        />
      </Section>

      <Section title="How to Withdraw">
        <Steps
          items={[
            "Complete account verification with a valid ID document.",
            "Open the cashier and switch to the 'Withdrawal' tab.",
            "Select the same method you used for depositing where possible.",
            "Enter the amount and your payment details, then confirm the request.",
            "Wait for the payout — most requests are processed within a few hours.",
          ]}
        />
      </Section>

      <Section title="Payment FAQ">
        <Faq
          items={[
            {
              q: "Does 1Win charge commission?",
              a: "The bookmaker does not add fees, though your bank or payment provider may apply its own charges.",
            },
            {
              q: "Why is my withdrawal delayed?",
              a: "Delays usually happen when verification is incomplete, wagering requirements are unmet or the payment provider is processing a queue.",
            },
            {
              q: "Can I withdraw to a different method?",
              a: "Operators generally require withdrawals to the same method used for the deposit; alternatives may be offered if that is impossible.",
            },
          ]}
        />
      </Section>
    </>
  );
}
