<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the MagicScale FSSAI licensing platform. Client-side tracking is initialised via `instrumentation-client.js` (the recommended approach for Next.js 15.3+), with a reverse proxy configured in `next.config.mjs` so analytics traffic routes through the app domain and bypasses ad blockers. A server-side PostHog client (`src/lib/posthog-server.js`) is used in two API routes to capture critical business events that cannot be tracked client-side: registration creation and payment webhook outcomes.

| Event | Description | File |
|---|---|---|
| `application_form_opened` | User clicked Apply Now and opened the FSSAI registration dialog | `src/components/general/Payment/PayButton/index.jsx` |
| `business_type_selected` | User selected their business type in step 1 of the registration form | `src/components/general/CustomerInfoForm/index.jsx` |
| `turnover_selected` | User selected their annual turnover range in step 2, triggering a license type suggestion | `src/components/general/CustomerInfoForm/index.jsx` |
| `lead_saved` | User advanced past step 2; their contact details were saved as a lead | `src/components/general/CustomerInfoForm/index.jsx` |
| `registration_submitted` | User submitted the completed registration form with all documents | `src/components/general/CustomerInfoForm/index.jsx` |
| `registration_created` | Server successfully created a registration record and Cashfree payment order | `src/app/api/payments/registration/route.js` |
| `payment_completed` | Cashfree webhook confirmed a successful payment for a registration | `src/app/api/cashfree/webhook/route.js` |
| `payment_failed` | Cashfree webhook reported a failed payment for a registration | `src/app/api/cashfree/webhook/route.js` |
| `payment_success_page_viewed` | User landed on the payment success confirmation page | `src/app/(root)/(payment)/payment-status/success/page.jsx` |
| `whatsapp_join_clicked` | User clicked the Join WhatsApp button on the payment success page | `src/app/(root)/(payment)/payment-status/success/page.jsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://eu.posthog.com/project/170657/dashboard/794161)
- [FSSAI Registration Conversion Funnel](https://eu.posthog.com/project/170657/insights/Z9GYXwoL)
- [Registrations Created Over Time](https://eu.posthog.com/project/170657/insights/6FtBmzi1)
- [Payment Outcomes: Success vs Failure](https://eu.posthog.com/project/170657/insights/ITLOhhuA)
- [Business Types Selected](https://eu.posthog.com/project/170657/insights/Wp3weWXr)
- [Form Opens vs Registrations Submitted](https://eu.posthog.com/project/170657/insights/n87srivq)

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify in PostHog Error Tracking.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
