import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "./shadcn/ui/dialog";
import {Button} from "./shadcn/ui/button";
import {Form} from "./shadcn/ui/form";
import {format} from "date-fns";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import useFriends from "@/hooks/useFriends";
import {Friend} from "@/models/Friend";
import {useState} from "react";
import FirstNameInput from "@/components/friendDialogComponents/FirstNameInput";
import {formSchema} from "@/components/friendDialogComponents/formSchema";
import LastNameInput from "@/components/friendDialogComponents/LastNameInput";
import LastContactDatePick from "@/components/friendDialogComponents/LastContactDatePick";
import LastContactTypeSelect from "@/components/friendDialogComponents/LastContactTypeSelect";
import DesiredContactFreqInput from "@/components/friendDialogComponents/DesiredContactFreqInput";
import CategorySelect from "@/components/friendDialogComponents/CategorySelect";

const EditFriendDialog = ({friend}: { friend?: Friend }) => {
    const [open, setOpen] = useState(false);
    const {addFriend, updateFriend} = useFriends();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: friend?.firstName ?? "",
            lastName: friend?.lastName ?? "",
            lastContactDate: friend?.lastContactDate ?? new Date().toString(),
            lastContactType: friend?.lastContactType.toString() || "",
            desiredContactFrequency: friend?.desiredContactFrequency ?? 1,
            categoryId: friend?.categoryId?.toString() ?? undefined,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const newFriend: Friend = {
            id: friend ? friend.id : 0,
            firstName: values.firstName,
            lastName: values.lastName,
            lastContactDate: format(values.lastContactDate, "yyyy-MM-dd"),
            lastContactType: Number(values.lastContactType),
            desiredContactFrequency: values.desiredContactFrequency,
            categoryId: Number(values.categoryId),
        };

        if (friend) {
            await updateFriend(newFriend)
        } else {
            await addFriend(newFriend)
        }

        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary">{friend ? "Edit" : "Add Friend"}</Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Add Friend</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <FirstNameInput form={form}/>
                        <LastNameInput form={form}/>
                        <LastContactDatePick form={form}/>
                        <LastContactTypeSelect form={form}/>
                        <DesiredContactFreqInput form={form}/>
                        <CategorySelect form={form}/>
                        <Button type="submit">{friend ? "Save" : "Add"}</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditFriendDialog;
