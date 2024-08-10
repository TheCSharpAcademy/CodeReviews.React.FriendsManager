"use client"

import {FormControl, FormField, FormItem, FormLabel} from "@/components/shadcn/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/shadcn/ui/select";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/components/friendDialogComponents/formSchema";
import useCategories from "@/hooks/useCategories";

const CategorySelect = ({form}: { form: UseFormReturn<z.infer<typeof formSchema>> }) => {
    const {categories} = useCategories();

    return (
        <FormField
            control={form.control}
            name="categoryId"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a category"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {categories &&
                                        categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id.toString()}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                </FormItem>
            )}
        />
    );
};

export default CategorySelect;