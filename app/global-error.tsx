"use client"

import { Card, CardContent, Button } from "@ui"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
                <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md text-center">
                        <CardContent className="pt-6">
                            <div className="mb-6">
                                <div className="text-6xl mb-4">💥</div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">Critical system error</h1>
                                <p className="text-gray-600 mb-6">
                                    A critical error has occurred in the application. Please reload the page.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <Button onClick={reset} className="w-full bg-red-600 hover:bg-red-700">
                                    Reload application
                                </Button>

                                <Button variant="outline" onClick={() => (window.location.href = "/")} className="w-full">
                                    Go to home
                                </Button>
                            </div>

                            {error.digest && <p className="text-xs text-gray-400 mt-4">Error ID: {error.digest}</p>}
                        </CardContent>
                    </Card>
                </div>
            </body>
        </html>
    )
}
