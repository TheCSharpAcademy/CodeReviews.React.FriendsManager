import React from 'react';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/shadcn/ui/form";
import {Input} from "@/components/shadcn/ui/input";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/components/friendDialogComponents/formSchema";

const DesiredContactFreqInput = ({form}: { form: UseFormReturn<z.infer<typeof formSchema>> }) => {
    return (
        <FormField
            control={form.control}
            name="desiredContactFrequency"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Desired Contact Frequency</FormLabel>
                    <FormControl>
                        <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                    </FormControl>
                    <FormDescription>
                        Number of maximum days without contact
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default DesiredContactFreqInput;