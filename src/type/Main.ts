import { userEmail,UserWebLink } from "@/Schema/EmailLink";
import {z} from 'zod'
// Create TypeScript interfaces from the Zod schemas
export type UserEmail = z.infer<typeof userEmail>;
export type UserWebLink = z.infer<typeof UserWebLink>;