import {Friend} from "@/models/Friend";

export const crossedContactFrequency = (friend:Friend):boolean => {
    const {desiredContactFrequency, lastContactDate} = friend;
    const differenceInTime = Math.floor((new Date().getTime() - new Date(lastContactDate).getTime()) / 1000 / 60 / 60 / 24);

    return differenceInTime > desiredContactFrequency
}