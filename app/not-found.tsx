
import { Card, CardContent, Button } from "@ui"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-amber-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md text-center">
                <CardContent className="pt-6">
                    <div className="mb-6">
                        <div className="text-6xl mb-4">🔍</div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>
                        <p className="text-gray-600 mb-6">
                            The page you are looking for does not exist or has been moved. Please check the URL or return to the home page.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Link href="/" className="block">
                            <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Back to home</Button>
                        </Link>
                    </div>

                    <p className="text-xs text-gray-400 mt-4">Error 404 - Page not found</p>
                </CardContent>
            </Card>
        </div>
    )
}
