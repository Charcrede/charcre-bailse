import { db } from '@/lib/firebase';
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    Timestamp,
    where
} from 'firebase/firestore';
import { Project } from '@/types';

const COLLECTION_NAME = 'projects';

export const projectService = {
    getAll: async (): Promise<Project[]> => {
        const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
    },

    getBySlug: async (slug: string): Promise<Project | null> => {
        const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() } as Project;
    },

    getById: async (id: string): Promise<Project | null> => {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return null;
        return { id: docSnap.id, ...docSnap.data() } as Project;
    },

    create: async (project: Omit<Project, 'id'>) => {
        return await addDoc(collection(db, COLLECTION_NAME), {
            ...project,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        });
    },

    update: async (id: string, project: Partial<Project>) => {
        const docRef = doc(db, COLLECTION_NAME, id);
        return await updateDoc(docRef, {
            ...project,
            updatedAt: Timestamp.now(),
        });
    },

    delete: async (id: string) => {
        const docRef = doc(db, COLLECTION_NAME, id);
        return await deleteDoc(docRef);
    },
};
