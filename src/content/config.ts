import { projects } from "./projects/schema.ts";
import { landingpage } from "./landingpage/schema.ts";
import { layout} from "./layout/schema.ts";
import { personal } from "./personal/schema.ts";
import { about } from "./about/schema.ts";

export const collections = {
    'projects': projects,
    'landingpage': landingpage,
    'layout': layout,
    'personal': personal,
    'about': about,
}