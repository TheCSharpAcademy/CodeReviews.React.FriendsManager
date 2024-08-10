import React from 'react';
import {capitalizeFirst} from "@/utils/capitalizeFirst";
import {contactTypeToString} from "@/utils/contactTypeToString";
import EditFriendDialog from "@/components/EditFriendDialog";
import {Button} from "@/components/shadcn/ui/button";
import {Friend} from "@/models/Friend";
import useFriends from "@/hooks/useFriends";
import {Card} from "@/components/shadcn/ui/card";
import {crossedContactFrequency} from "@/utils/crossedContactFrequency";

const FriendItem = ({friend}:{friend:Friend}) => {
    const {deleteFriend} = useFriends();

    return (
        <Card className={`flex bg-black p-4 border-4 items-center text-white gap-10 ${crossedContactFrequency(friend) ? "border-red-500 animate-pulse hover:animate-none" : ""}`}>
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">
                    {capitalizeFirst(friend.firstName)} {capitalizeFirst(friend.lastName)}
                </h2>
                <div className="flex flex-col gap-1">
                    <p>Last contacted at: <span className="font-bold">{friend.lastContactDate.toString()}</span></p>
                    <p>
                        Last contact type: <span className="font-bold">{contactTypeToString(friend.lastContactType)}</span>
                    </p>
                    <p>Have to contact at least once for: <span className="font-bold">{friend.desiredContactFrequency} day(s)</span></p>
                    {friend.categoryId && <p>Category: {friend.categoryName}</p>}
                </div>
            </div>
            <div className="flex items-center gap-4">
                <EditFriendDialog friend={friend}/>
                <Button onClick={() => deleteFriend(friend.id)} variant="destructive">
                    Delete
                </Button>
            </div>
        </Card>
    );
};

export default FriendItem;