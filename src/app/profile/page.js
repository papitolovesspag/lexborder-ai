"use client";

import { useState } from "react";
import { ArrowLeft, User, Camera, UploadCloud, CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProfilePage() {
  notFound();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUploadClick = () => {
    setIsUploading(true);
    // Simulate upload delay for UploadThing
    setTimeout(() => {
      setIsUploading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <nav className="h-16 flex items-center px-6 border-b border-card-border bg-white">
        <Link href="/dashboard" className="flex items-center gap-2 text-sm text-slate-500 hover:text-accent transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-foreground mb-8">Profile Settings</h1>

        <div className="bg-white rounded-3xl border border-card-border shadow-sm p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-accent" /> Profile Picture
          </h2>
          
          <div className="flex items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative group">
              <User className="w-12 h-12 text-slate-300" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-sm text-slate-500 mb-4">
                Upload a high-resolution profile picture. Files will be stored securely via UploadThing Cloud Storage.
              </p>
              
              <button 
                onClick={handleUploadClick}
                disabled={isUploading}
                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                {isUploading ? (
                  <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span> Uploading...</span>
                ) : success ? (
                  <span className="flex items-center gap-2 text-emerald-400"><CheckCircle className="w-4 h-4" /> Uploaded</span>
                ) : (
                  <span className="flex items-center gap-2"><UploadCloud className="w-4 h-4" /> Select Image</span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-card-border shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input type="text" defaultValue="John Doe" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-accent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input type="email" defaultValue="john@acme.com" readOnly className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                <input type="text" defaultValue="Acme Corp" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-accent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Industry</label>
                <input type="text" defaultValue="Electronics" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-accent outline-none" />
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-card-border">
              <button type="button" className="bg-accent text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
