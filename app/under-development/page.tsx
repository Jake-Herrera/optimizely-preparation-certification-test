import Link from "next/link";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@ui";
import { ArrowLeft, Trophy, Construction } from "lucide-react";

export default function UnderDevelopmentPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/register"
                            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span>Back to Registration</span>
                        </Link>
                        <div className="flex items-center space-x-2">
                            <Trophy className="h-6 w-6 text-primary" />
                            <h1 className="text-xl font-bold text-foreground">CertPrep</h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <Card className="border-border bg-card text-center">
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <Construction className="h-16 w-16 text-amber-500" />
                            </div>
                            <CardTitle className="text-2xl text-card-foreground">Content Under Development</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-lg text-muted-foreground">We apologize! This content is still under development.</p>
                            <p className="text-sm text-muted-foreground">
                                The Optimizely SaaS CMS Developer Expert Certification content is currently being prepared. Please check
                                back soon or choose the Developer Certification to get started.
                            </p>
                            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                <Link href="/register">Return to Registration</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
