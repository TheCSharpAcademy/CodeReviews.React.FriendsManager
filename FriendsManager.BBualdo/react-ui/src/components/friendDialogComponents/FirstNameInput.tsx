import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/shadcn/ui/form";
import {Input} from "@/components/shadcn/ui/input";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/components/friendDialogComponents/formSchema";

const FirstNameInput = ({form}: { form: UseFormReturn<z.infer<typeof formSchema>> }) => {
    return (
        <FormField
            control={form.control}
            name="firstName"
            render={({field}) => (
                <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                        <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default FirstNameInput;