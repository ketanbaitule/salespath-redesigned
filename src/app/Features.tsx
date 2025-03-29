import {
  MapPin,
  CheckSquare,
  UserCircle,
  DollarSign,
  BarChart3,
  Users,
} from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="bg-gray-50 py-20">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to manage your field sales team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            SalesPath provides all the tools you need to track, manage, and
            optimize your field sales operations.
          </p>
        </div>

        <div className="container mx-auto mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<MapPin className="h-10 w-10 text-primary" />}
            title="Real-time Location Tracking"
            description="Monitor your team's location in real-time. Track check-ins, check-outs, and time spent at each location."
          />
          <FeatureCard
            icon={<CheckSquare className="h-10 w-10 text-primary" />}
            title="Task Allocation"
            description="Assign tasks based on location and availability. Create task templates for quick allocation."
          />
          <FeatureCard
            icon={<UserCircle className="h-10 w-10 text-primary" />}
            title="Lead Management"
            description="Track leads through the sales pipeline. Monitor conversion rates and potential revenue."
          />
          <FeatureCard
            icon={<DollarSign className="h-10 w-10 text-primary" />}
            title="Payout Calculation"
            description="Automatically calculate commissions and bonuses based on performance metrics."
          />
          <FeatureCard
            icon={<BarChart3 className="h-10 w-10 text-primary" />}
            title="Performance Analytics"
            description="Gain insights into your team's performance with detailed analytics and reports."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-primary" />}
            title="Team Management"
            description="Manage your sales team, track individual performance, and optimize resource allocation."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
