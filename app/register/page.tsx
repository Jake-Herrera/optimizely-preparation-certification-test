"use client"

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
    Label,
    RadioGroup,
    RadioGroupItem
} from "@ui";

import { ArrowLeft, Trophy } from "lucide-react"
import { CERTIFICATION_IDS, certificationOptions } from "@data";


export default function RegisterPage() {
    const [name, setName] = useState("")
    const [selectedCertification, setSelectedCertification] = useState("")
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (name && selectedCertification) {
            if (selectedCertification === CERTIFICATION_IDS.EXPERT) {
                router.push("/under-development")
                return
            }

            if (selectedCertification === CERTIFICATION_IDS.DEVELOPER) {
                router.push(`/preparation?name=${encodeURIComponent(name)}&cert=${selectedCertification}`)
                return
            }
        }
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span>Back</span>
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
                    <div className="text-center space-y-4 mb-8">
                        <h2 className="text-3xl font-bold text-foreground">Let's Get Started!</h2>
                        <p className="text-muted-foreground">Tell us a bit about yourself and choose your certification path.</p>
                    </div>

                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="text-xl text-card-foreground">Registration Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-medium text-card-foreground">
                                        What's your name?
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-input border-border text-foreground"
                                        required
                                    />
                                </div>

                                {/* Certification Selection */}
                                <div className="space-y-4">
                                    <Label className="text-sm font-medium text-card-foreground">
                                        Which certification would you like to prepare for?
                                    </Label>
                                    <RadioGroup
                                        value={selectedCertification}
                                        onValueChange={setSelectedCertification}
                                        className="space-y-3"
                                    >
                                        {certificationOptions.map((cert) => {
                                            const IconComponent = cert.icon
                                            return (
                                                <div
                                                    key={cert.id}
                                                    className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                                                >
                                                    <RadioGroupItem value={cert.id} id={cert.id} className="mt-1" />
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex items-center space-x-2">
                                                            <IconComponent className="h-5 w-5 text-primary" />
                                                            <Label
                                                                htmlFor={cert.id}
                                                                className="text-base font-medium text-card-foreground cursor-pointer"
                                                            >
                                                                {cert.title}
                                                            </Label>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{cert.description}</p>
                                                        <div className="flex space-x-4 text-xs text-muted-foreground">
                                                            <span className="bg-accent/10 text-accent px-2 py-1 rounded">{cert.duration}</span>
                                                            <span className="bg-secondary/10 text-secondary px-2 py-1 rounded">
                                                                {cert.difficulty}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </RadioGroup>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base font-semibold"
                                    disabled={!name || !selectedCertification}
                                >
                                    Begin My Preparation Journey
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
