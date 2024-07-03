import {z} from "zod";

export const formSchema = z.object({
    firstName: z.string().min(3, {message: "First name must be at least 3 characters long."}).max(24, {message: "First name can't be longer than 24 characters."}),
    lastName: z.string().min(3, {message: "Last name must be at least 3 characters long."}).max(48, {message: "Last name can't be longer than 48 characters."}),
    lastContactDate: z.string(),
    lastContactType: z.string(),
    desiredContactFrequency: z.number().min(1, {message: "Minimum value is 1 day."}).max(7, {message: "What kind of friend are you? Contact your friend at least once a week!"}),
    categoryId: z.string().optional(),
});