"use client";

import FriendsService from "@/services/FriendsService";
import FriendsState from "@/state/FriendsState";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {Friend} from "@/models/Friend";

const useFriends = () => {
  const [friends, setFriends] = useRecoilState(FriendsState.friendsState);
  const [error, setError] = useRecoilState(FriendsState.errorState);
  const [isLoading, setIsLoading] = useRecoilState(FriendsState.isLoadingState);

  const fetchFriends = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const friends = await FriendsService.GetFriends();
      setFriends(friends);
    } catch (error) {
      setIsLoading(false);
      setError("Fetching friends failed!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const addFriend = async (friend: Friend) => {
    await FriendsService.AddFriend(friend);
    await fetchFriends();
  };

  const updateFriend = async (friend: Friend) => {
    await FriendsService.UpdateFriend(friend);
    if (friends) {
      const updatedFriends = [...friends];
      const friendIndex = friends.findIndex((f) => f.id === friend.id);
      updatedFriends[friendIndex] = friend;
      setFriends(updatedFriends);
    }

  }

  const deleteFriend = async (id: number) => {
    await FriendsService.DeleteFriend(id);
    setFriends((prev) => prev?.filter((f) => f.id !== id));
  };

  return { friends, error, isLoading, deleteFriend, addFriend, updateFriend };
};

export default useFriends;
