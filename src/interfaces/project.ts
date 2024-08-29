import type { TypeTag } from "./tag";

export interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
    github: string;
    tags: TypeTag[];
  }
  