import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { BookOpen, ArrowLeft } from "lucide-react";

export const Unauthorized = () => {
    const { user } = useAppSelector((state) => state.auth);
    const redirectPath = user?.role === "CUSTOMER" ? "/customer" : "/admin";

    return (
        <div className="flex min-h-screen bg-secondary/30">
            {/* Sidebar-like placeholder */}
            <aside className="hidden lg:flex w-64 bg-primary text-white flex-col p-6">
                <div className="flex items-center gap-2 mb-6">
                    <BookOpen className="h-8 w-8" />
                    <span className="text-xl font-semibold">My Account</span>
                </div>
                <div className="mt-auto text-center text-white/50">
                    Unauthorized Access
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-6 lg:p-12">
                <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-md w-full border border-gray-200">
                    <div className="flex flex-col items-center gap-4">
                        <h1 className="text-4xl font-extrabold text-red-600">
                            403
                        </h1>
                        <p className="text-lg font-semibold text-gray-700">
                            You are not authorized to access this page.
                        </p>
                        <Link
                            to={redirectPath}
                            className="mt-4 inline-flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            Back to Authorized Page
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};
