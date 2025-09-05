"use client"

import { useEffect } from "react";
import { Card, CardContent, Button } from "@ui";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-amber-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md text-center">
                <CardContent className="pt-6">
                    <div className="mb-6">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong.</h1>
                        <p className="text-gray-600 mb-6">
                            An unexpected error has occurred. Don't worry, you can try again.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Button onClick={reset} className="w-full bg-cyan-600 hover:bg-cyan-700">
                            Try again
                        </Button>

                        <Button variant="outline" onClick={() => (window.location.href = "/")} className="w-full">
                            Back to home
                        </Button>
                    </div>

                    {error.digest && <p className="text-xs text-gray-400 mt-4">Error ID: {error.digest}</p>}
                </CardContent>
            </Card>
        </div>
    )
}
