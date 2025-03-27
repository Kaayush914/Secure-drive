import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Car, Activity, MapPin, MessageSquare } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SafeDrive Insurance</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#home" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link href="/#features" className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Link href="/#about" className="text-sm font-medium hover:underline">
              About
            </Link>
            <Link href="/#contact" className="text-sm font-medium hover:underline">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section id="home" className="py-20 md:py-28">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Smart Insurance for <span className="text-primary">Safer Drivers</span>
            </h1>
            <p className="mt-6 max-w-[42rem] text-lg text-muted-foreground">
              Our AI-powered insurance platform rewards safe driving habits with better rates and faster claims
              processing.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Smart Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <Car className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Driver Monitoring</h3>
                <p className="text-muted-foreground">AI-powered drowsiness detection keeps you safe on the road.</p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <Activity className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Risk Analysis</h3>
                <p className="text-muted-foreground">
                  Advanced AI decision system for fair and accurate claim assessments.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <MapPin className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">GPS Tracking</h3>
                <p className="text-muted-foreground">
                  Real-time location tracking for emergency assistance and claim verification.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <MessageSquare className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">AI Chatbot</h3>
                <p className="text-muted-foreground">
                  Gemini-powered assistant for instant support and policy information.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">About SafeDrive Insurance</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  SafeDrive Insurance is revolutionizing the auto insurance industry by combining cutting-edge AI
                  technology with traditional coverage to create a safer driving experience for everyone.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Our mission is to reduce accidents, save lives, and reward safe drivers with lower premiums and better
                  service.
                </p>
                <Link href="#contact">
                  <Button className="gap-2">
                    Contact Us <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="bg-muted rounded-lg p-6">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="About SafeDrive Insurance"
                  className="w-full h-auto rounded-md"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
            <div className="max-w-2xl mx-auto bg-background p-8 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input type="text" className="w-full p-2 border rounded-md" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" className="w-full p-2 border rounded-md" placeholder="Your email" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea className="w-full p-2 border rounded-md h-32" placeholder="Your message"></textarea>
              </div>
              <Button className="w-full">Send Message</Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-semibold">SafeDrive Insurance</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SafeDrive Insurance. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

