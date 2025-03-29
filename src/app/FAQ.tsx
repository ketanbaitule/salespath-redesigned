export default function FAQ() {
  return (
    <section id="faq" className="py-20">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            We've compiled a list of frequently asked questions to help you get
            started with SalesPath.
          </p>
        </div>
        <div className="mt-16 mx-auto max-w-3xl space-y-8">
          <div className="border-b pb-5">
            <h3 className="text-xl font-semibold mb-2">What is SalesPath?</h3>
            <p className="text-gray-600">
              SalesPath is a comprehensive field sales management platform that
              helps you track your sales team's location, allocate tasks, manage
              leads, and calculate payouts—all in one place.
            </p>
          </div>

          <div className="border-b pb-5">
            <h3 className="text-xl font-semibold mb-2">
              How does the location tracking work?
            </h3>
            <p className="text-gray-600">
              SalesPath uses GPS technology to track your team's location in
              real-time. Salesperson can check in and out of locations, and
              managers can see where everyone is at a glance. All data is
              securely stored and privacy controls are available.
            </p>
          </div>

          {/* <div className="border-b pb-5">
            <h3 className="text-xl font-semibold mb-2">
              Can I integrate SalesPath with my existing CRM?
            </h3>
            <p className="text-gray-600">
              Yes! SalesPath offers integrations with popular CRM platforms
              including Salesforce, HubSpot, and Zoho CRM. Our API also allows
              for custom integrations with your existing systems.
            </p>
          </div> */}

          <div className="border-b pb-5">
            <h3 className="text-xl font-semibold mb-2">
              How does the payout calculation work?
            </h3>
            <p className="text-gray-600">
              SalesPath automatically calculates commissions and bonuses based
              on your custom rules. You can set up different commission
              structures, performance bonuses, and incentives. The system tracks
              all sales activities and applies your rules to calculate accurate
              payouts.
            </p>
          </div>

          <div className="border-b pb-5">
            <h3 className="text-xl font-semibold mb-2">
              Is SalesPath suitable for small businesses?
            </h3>
            <p className="text-gray-600">
              Absolutely! SalesPath is designed to scale with your business.
              Whether you have 5 or 500 salespeople, our platform can
              accommodate your needs and grow with you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
