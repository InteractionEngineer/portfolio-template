import { Color, Category, Language, categoryColorMap } from "../constants";
import { useTranslations } from "./i18n/utils";

export function getColorProps(color: Color) {
    switch (color) {
        case Color.Blue:
            return {
                bgColor: "bg-blue-100",
                textColor: "text-blue-800",
                iconColor: "stroke-blue-800",
                legendDotColor: "bg-blue-400",
            };
        case Color.Green:
            return {
                bgColor: "bg-green-100",
                textColor: "text-green-800",
                iconColor: "stroke-green-800",
                legendDotColor: "bg-green-400",
            };
        case Color.Amber:
            return {
                bgColor: "bg-amber-100",
                textColor: "text-amber-800",
                iconColor: "stroke-amber-800",
                legendDotColor: "bg-amber-400",
            };
        case Color.Yellow:
            return {
                bgColor: "bg-yellow-100",
                textColor: "text-yellow-800",
                iconColor: "stroke-yellow-800",
                legendDotColor: "bg-yellow-400",
            };
        case Color.Emerald:
            return {
                bgColor: "bg-emerald-100",
                textColor: "text-emerald-800",
                iconColor: "stroke-emerald-800",
                legendDotColor: "bg-emerald-400",
            };
        case Color.Orange:
            return {
                bgColor: "bg-orange-100",
                textColor: "text-orange-800",
                iconColor: "stroke-orange-800",
                legendDotColor: "bg-orange-400",
            };
        case Color.Violet:
            return {
                bgColor: "bg-violet-100",
                textColor: "text-violet-800",
                iconColor: "stroke-violet-800",
                legendDotColor: "bg-violet-400",
            };
        case Color.Cyan:
            return {
                bgColor: "bg-cyan-100",
                textColor: "text-cyan-800",
                iconColor: "stroke-cyan-800",
                legendDotColor: "bg-cyan-400",
            };
        case Color.Rose:
            return {
                bgColor: "bg-rose-100",
                textColor: "text-rose-800",
                iconColor: "stroke-rose-800",
                legendDotColor: "bg-rose-400",
            };
        case Color.Purple:
            return {
                bgColor: "bg-purple-100",
                textColor: "text-purple-800",
                iconColor: "stroke-purple-800",
                legendDotColor: "bg-purple-400",
            };
        case Color.Red:
            return {
                bgColor: "bg-red-100",
                textColor: "text-red-800",
                iconColor: "stroke-red-800",
                legendDotColor: "bg-red-400",
            };
        case Color.Pink:
            return {
                bgColor: "bg-pink-100",
                textColor: "text-pink-800",
                iconColor: "stroke-pink-800",
                legendDotColor: "bg-pink-400",
            };

        default:
            return {
                bgColor: "bg-gray-100",
                textColor: "text-gray-800",
                iconColor: "stroke-gray-800",
                legendDotColor: "bg-gray-400",
            };
    }
}

export function getAvailableTags(lang: Language) {
    const fromDict = useTranslations(lang);
    return [
        { name: fromDict('tags.mixedReality'), color: categoryColorMap[Category.Platform] },
        { name: fromDict('tags.webDevelopment'), color: categoryColorMap[Category.ProgrammingLanguage] },
        { name: fromDict('tags.interactionDesign'), color: categoryColorMap[Category.Interface] },
        { name: fromDict('tags.webSockets'), color: categoryColorMap[Category.ServerNetwork] },
        { name: "Docker", color: categoryColorMap[Category.ServerNetwork] },
        { name: fromDict('tags.userExperience'), color: categoryColorMap[Category.Interface] },
        { name: fromDict('tags.frontendDevelopment'), color: categoryColorMap[Category.Interface] },
        { name: "Swift", color: categoryColorMap[Category.ProgrammingLanguage] },
        { name: "SwiftUI", color: categoryColorMap[Category.ProgrammingLanguage] },
        { name: fromDict('tags.augmentedReality'), color: categoryColorMap[Category.Platform] },
        { name: "Flutter", color: categoryColorMap[Category.ProgrammingLanguage] },
        { name: fromDict('tags.realTimeDatabase'), color: categoryColorMap[Category.ServerNetwork] },
        { name: "Unity", color: categoryColorMap[Category.Platform] },
        { name: "C#", color: categoryColorMap[Category.ProgrammingLanguage] },
        { name: fromDict('tags.electricalEngineering'), color: categoryColorMap[Category.Engineering] },
        { name: fromDict('tags.gameDesign'), color: categoryColorMap[Category.Miscellaneous] },
      ]
}