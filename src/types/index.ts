export interface Project {
    id?: string;
    title: string;
    slug: string;
    shortDescription: {fr: string; en: string};
    type: "web_app" | "mobile_app" | "library" | "tool";
    stack: string[];
    images: string[]; // URLs from Cloudinary
    coverImage: string;
    status: 'wip' | 'finished';
    link: string;
    createdAt: any; // Firestore Timestamp
    updatedAt: any;
}

export interface Skill {
    id?: string;
    name: string;
    category: 'frontend' | 'backend' | 'tools' | 'learning';
    icon?: string; // Optional icon URL or name
}

export interface BlogPost {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string; // Markdown or HTML
    published: boolean;
    createdAt: any;
}
