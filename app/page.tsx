import Link from "next/link";
import { Card, CardContent, Button } from "@ui";
import { CheckCircle, BookOpen, Target, Trophy } from "lucide-react";
export default function Home() {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">CertPrep</h1>
            </div>
            <p className="text-sm text-muted-foreground hidden md:block">
              Empower Your Learning Journey
            </p>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Welcome Message */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Welcome to this test preparation journey! 🎉
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I hope you find it enjoyable, engaging, and most importantly, helpful as you get ready to succeed in your
              certification exam.
            </p>
          </div>

          {/* Journey Steps */}
          <div className="grid md:grid-cols-3 gap-6 my-12">
            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">Assess Your Skills</h3>
                <p className="text-sm text-muted-foreground">
                  Start with a comprehensive assessment to identify your strengths and areas for improvement.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">Study Materials</h3>
                <p className="text-sm text-muted-foreground">
                  Access curated study materials and resources tailored to your certification exam.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">Practice Tests</h3>
                <p className="text-sm text-muted-foreground">
                  Take realistic practice exams to build confidence and track your progress.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Motivational Quote */}
          <Card className="border-accent/20 bg-accent/5">
            <CardContent className="p-8">
              <blockquote className="text-lg italic text-card-foreground">
                "Success is where preparation and opportunity meet."
              </blockquote>
              <p className="text-sm text-foreground/70 mt-2">- Bobby Unser</p>
            </CardContent>
          </Card>

          {/* CTA Button */}
          <div className="space-y-4">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Start Your Journey
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">Ready to begin? Let's get you prepared for success!</p>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                FAQs
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Support
              </a>
            </div>
            <p className="text-xs text-muted-foreground">© 2024 CertPrep. Empowering your certification journey.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
