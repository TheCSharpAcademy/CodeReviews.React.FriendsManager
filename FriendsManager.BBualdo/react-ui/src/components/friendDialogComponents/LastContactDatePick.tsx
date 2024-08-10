import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/shadcn/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/shadcn/ui/popover";
import {Button} from "@/components/shadcn/ui/button";
import {cn} from "@/utils/cn";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/shadcn/ui/calendar";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/components/friendDialogComponents/formSchema";

const LastContactDatePick = ({form}: { form: UseFormReturn<z.infer<typeof formSchema>> }) => {
    return (
        <FormField
            control={form.control}
            name="lastContactDate"
            render={({field}) => (
                <FormItem className="flex flex-col gap-2">
                    <FormLabel>Last Contacted At</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                onSelect={(date) => field.onChange(format(date!, "yyyy-MM-dd"))}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};

export default LastContactDatePick;