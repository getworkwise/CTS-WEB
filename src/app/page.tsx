import Link from "next/link";
import Image from "next/image";
import { Search, FileCheck, Shield, ArrowRight, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
        <div className="container h-14 flex items-center">
          <Link
            href="/"
            className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
          >
            <Shield className="w-6 h-6 mr-3" />
            <span className="font-bold">CTS Lost & Found</span>
            <span className="sr-only">CTS Lost & Found Platform</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">Login</Link>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container mx-auto flex max-w-[980px] flex-col items-center gap-4 py-12 md:py-24">
          <h1 className="text-center text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Secure Credential Tracing & Safety
          </h1>
          <p className="max-w-[750px] text-center text-lg text-muted-foreground">
            Efficiently manage and recover lost credentials, IDs, and important documents with our advanced Lost & Found platform.
          </p>
          <div className="flex w-full items-center justify-center space-x-4 py-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </section>

        <section className="bg-muted py-16" id="features">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <Search className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
                <p className="text-muted-foreground">Advanced algorithms to match lost and found items quickly.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FileCheck className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Secure Tracking</h3>
                <p className="text-muted-foreground">End-to-end encryption for sensitive document information.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">CTS Integration</h3>
                <p className="text-muted-foreground">Seamless integration with Credential Tracing and Safety protocols.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
            <div className="max-w-3xl mx-auto">
              <ol className="relative border-l border-gray-200 dark:border-gray-700">
                <li className="mb-10 ml-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Report Lost Item</h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Easily report your lost credentials or important documents through our secure platform.</p>
                </li>
                <li className="mb-10 ml-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI-Powered Matching</h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Our advanced algorithms work to match your lost item with found items in the database.</p>
                </li>
                <li className="ml-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Secure Recovery</h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Once a match is found, we facilitate a secure process for item recovery and verification.</p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-muted py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Credentials?</h2>
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CTS Lost & Found</h3>
              <p className="text-sm text-muted-foreground">
                Secure credential tracing and recovery platform for Rwanda.
              </p>
            </div>
            <div>
              <h4 className="text-md font-medium mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-medium mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-medium mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Facebook size={20} />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Twitter size={20} />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Instagram size={20} />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Linkedin size={20} />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-border/40">
            <p className="text-xs text-center text-muted-foreground">
              © {new Date().getFullYear()} CTS Lost & Found Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}