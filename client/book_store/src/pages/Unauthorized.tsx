import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export const Unauthorized = () => {
    const { user } = useAppSelector(state => state.auth);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="absolute top-4 left-4">
                <Link
                    to={user?.Role === "Customer" ? "/customer" : "/admin"}
                    className="text-primary hover:underline"
                >
                    &larr; Back to Authorized Page
                </Link>
            </div>
            <h1 className="text-3xl font-bold text-red-600">403 - Unauthorized</h1>
        </div>
    );
};
