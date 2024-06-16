import { Color } from "../constants";

export function getColorProps(color: Color) {
    switch (color) {
        case Color.Blue:
            return {
                bgColor: "bg-blue-100",
                textColor: "text-blue-800",
                iconColor: "stroke-blue-800",
            };
        case Color.Green:
            return {
                bgColor: "bg-green-100",
                textColor: "text-green-800",
                iconColor: "stroke-green-800",
            };
        case Color.Amber:
            return {
                bgColor: "bg-amber-100",
                textColor: "text-amber-800",
                iconColor: "stroke-amber-800",
            };
        case Color.Yellow:
            return {
                bgColor: "bg-yellow-100",
                textColor: "text-yellow-800",
                iconColor: "stroke-yellow-800",
            };
        case Color.Emerald:
            return {
                bgColor: "bg-emerald-100",
                textColor: "text-emerald-800",
                iconColor: "stroke-emerald-800",
            };
        case Color.Orange:
            return {
                bgColor: "bg-orange-100",
                textColor: "text-orange-800",
                iconColor: "stroke-orange-800",
            };
        case Color.Violet:
            return {
                bgColor: "bg-violet-100",
                textColor: "text-violet-800",
                iconColor: "stroke-violet-800",
            };
        case Color.Cyan:
            return {
                bgColor: "bg-cyan-100",
                textColor: "text-cyan-800",
                iconColor: "stroke-cyan-800",
            };
        case Color.Rose:
            return {
                bgColor: "bg-rose-100",
                textColor: "text-rose-800",
                iconColor: "stroke-rose-800",
            };
        case Color.Purple:
            return {
                bgColor: "bg-purple-100",
                textColor: "text-purple-800",
                iconColor: "stroke-purple-800",
            };
        case Color.Red:
            return {
                bgColor: "bg-red-100",
                textColor: "text-red-800",
                iconColor: "stroke-red-800",
            };
        case Color.Pink:
            return {
                bgColor: "bg-pink-100",
                textColor: "text-pink-800",
                iconColor: "stroke-pink-800",
            };

        default:
            return {
                bgColor: "bg-gray-100",
                textColor: "text-gray-800",
                iconColor: "stroke-gray-800",
            };
    }
}