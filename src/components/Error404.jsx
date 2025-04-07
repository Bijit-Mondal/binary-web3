import React from "react";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";

export default function Error404() {
    return (
        <Main>
            <div className="h-full w-full bg-white relative">
                <header className="bg-gray-100 text-gray-800 p-4 flex justify-center items-center shadow-md rounded-lg w-full max-w-4xl mx-auto">
                    <h1 className="text-lg font-semibold">TheEleven</h1>
                </header>
                <div className="flex flex-col items-center justify-center p-6 h-[70vh]">
                    <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-md border border-gray-300 text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            404 - Page Not Found
                        </h2>
                        <p className="text-lg text-gray-700 mb-4">
                            Oops! The page you are looking for does not exist.
                        </p>
                        <a
                            href="/"
                            className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white transition-all text-lg font-semibold rounded-xl shadow-md px-6"
                        >
                            Go Back to Home
                        </a>
                    </div>
                </div>
                <Footer />
            </div>
        </Main>
    );
}