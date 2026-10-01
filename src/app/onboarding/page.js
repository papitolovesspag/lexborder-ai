import { redirect, notFound } from "next/navigation";
import { ShieldCheck, Building2, Briefcase, ArrowRight } from "lucide-react";

export default async function OnboardingPage() {
  notFound();
  async function completeOnboarding(formData) {
    "use server";
    // In a real implementation:
    // const company = formData.get("company");
    // const industry = formData.get("industry");
    // await prisma.user.update({ ... set onboarded: true })
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#050B14] text-slate-200 font-sans flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* Dynamic Animated Background Blobs (CSS Only since it's a Server Component) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <div className="w-full max-w-md bg-[#0A1128]/80 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full pointer-events-none"></div>

        <div className="flex justify-center mb-6 relative z-10">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-white mb-2 tracking-tight relative z-10">Welcome to LexBorder</h1>
        <p className="text-slate-400 text-center mb-8 font-light text-sm relative z-10">Let's tailor your AI compliance engine before you start.</p>

        <form action={completeOnboarding} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
            <div className="relative group">
              <Building2 className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-blue-400 transition-colors" />
              <input 
                type="text" 
                name="company"
                required
                placeholder="Acme Corp" 
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-white placeholder-slate-500 font-light"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Industry</label>
            <div className="relative group">
              <Briefcase className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-purple-400 transition-colors z-10" />
              <select 
                name="industry"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all text-slate-300 appearance-none font-light [&>option]:bg-[#0A1128] [&>option]:text-slate-200 relative"
              >
                <option value="" disabled selected>Select an industry...</option>
                <option value="electronics">Electronics & Tech</option>
                <option value="agriculture">Agriculture</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="software">Software & IT</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full relative group mt-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold transition-all shadow-xl">
              Complete Setup <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </form>
      </div>
    </main>
  );
}
