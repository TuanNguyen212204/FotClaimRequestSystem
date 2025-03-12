import { z } from "zod";
import { formSchema } from "@/Schemas/ClaimSchema";
export type FormData = z.infer<typeof formSchema>;