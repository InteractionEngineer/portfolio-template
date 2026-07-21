export interface TimelineData {
    title: string;
    location: string;
    locationUrl?: string;
    description: string;
    dateStart: Date;
    dateEnd: Date | undefined;
    type: IconType;
}

export enum IconType {
    Work = "Work",
    Education = "Education",
    Volunteer = "Volunteer",
    Certification = "Certification",
    Other = "Other",
}