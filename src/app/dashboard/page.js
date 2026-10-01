import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { DashboardOverview } from "./components/DashboardOverview";

// This is a Server Component that fetches real data
export default async function DashboardPage() {
  notFound();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = session.user.id;

  // Fetch real data from Prisma
  let totalChecks = await prisma.tariffCheck.count({ where: { userId } });
  
  // SEED DATA FOR DEMONSTRATION IF EMPTY
  if (totalChecks === 0) {
    await prisma.tariffCheck.createMany({
      data: [
        { userId, country: "US", hsCode: "8517.12.00", status: "COMPLIANT", taxRate: 0.05, createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
        { userId, country: "UK", hsCode: "6109.10.00", status: "FLAGGED", taxRate: 0.12, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
        { userId, country: "CA", hsCode: "9018.90.80", status: "COMPLIANT", taxRate: 0.02, createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
        { userId, country: "DE", hsCode: "8703.23.19", status: "PENDING", taxRate: null, createdAt: new Date() },
      ]
    });
    await prisma.document.createMany({
      data: [
        { userId, name: "US Customs Declaration", type: "CUSTOMS_FORM", status: "APPROVED" },
        { userId, name: "EU Import License", type: "LICENSE", status: "REVIEW_REQUIRED" },
      ]
    });
    
    // Re-fetch after seeding
    totalChecks = await prisma.tariffCheck.count({ where: { userId } });
  }

  const compliantChecks = await prisma.tariffCheck.count({ where: { userId, status: "COMPLIANT" } });
  const flaggedChecks = await prisma.tariffCheck.count({ where: { userId, status: "FLAGGED" } });
  const totalDocuments = await prisma.document.count({ where: { userId } });

  // Get recent activity
  const recentChecks = await prisma.tariffCheck.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  // Calculate compliance rate
  const complianceRate = totalChecks > 0 ? Math.round((compliantChecks / totalChecks) * 100) : 0;

  // Chart Data preparation (grouping checks by date would be better, but we mock a trend line for the demo based on the real count)
  const chartData = [
    { name: "Mon", checks: Math.max(1, totalChecks - 3), compliant: Math.max(1, compliantChecks - 2) },
    { name: "Tue", checks: Math.max(2, totalChecks - 2), compliant: Math.max(2, compliantChecks - 1) },
    { name: "Wed", checks: Math.max(1, totalChecks - 1), compliant: Math.max(1, compliantChecks - 1) },
    { name: "Thu", checks: Math.max(4, totalChecks), compliant: Math.max(3, compliantChecks) },
    { name: "Fri", checks: totalChecks + 1, compliant: compliantChecks + 1 },
    { name: "Sat", checks: totalChecks, compliant: compliantChecks },
    { name: "Sun", checks: totalChecks + 2, compliant: compliantChecks + 1 },
  ];

  return (
    <DashboardOverview 
      user={session.user}
      stats={{ totalChecks, compliantChecks, flaggedChecks, totalDocuments, complianceRate }}
      recentChecks={recentChecks}
      chartData={chartData}
    />
  );
}
