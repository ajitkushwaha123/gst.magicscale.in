import { Sparkles } from "lucide-react";

export const Logo = () => (
    <div
        className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 shadow-md shadow-green-500/20 group-hover:shadow-green-500/40 group-hover:-translate-y-0.5 transition-all duration-300 animate-in zoom-in-95 duration-500"
    >
        <Sparkles className="w-5 h-5 text-white drop-shadow-sm" />
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300" />
    </div>
);