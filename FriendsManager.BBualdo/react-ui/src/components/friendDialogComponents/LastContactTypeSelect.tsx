import React from 'react';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/shadcn/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/shadcn/ui/select";
import {contactTypeOptions} from "@/enums/ContactTypes";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/components/friendDialogComponents/formSchema";

const LastContactTypeSelect = ({form}: { form: UseFormReturn<z.infer<typeof formSchema>> }) => {
    return (
        <FormField
            control={form.control}
            name="lastContactType"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Last Contact Type</FormLabel>
                    <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a contact type"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {contactTypeOptions &&
                                        contactTypeOptions.map((contactType) => (
                                            <SelectItem
                                                key={contactType.value}
                                                value={contactType.value.toString()}
                                            >
                                                {contactType.label}
                                            </SelectItem>
                                        ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default LastContactTypeSelect;