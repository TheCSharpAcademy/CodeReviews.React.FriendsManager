import { url } from "@/config/config";
import { Friend } from "@/models/Friend";
import axios from "axios";

class FriendsService {
  async GetFriends(): Promise<Friend[]> {
    return (await axios.get(url + "/friends")).data as Friend[];
  }

  async AddFriend(friend: Friend): Promise<void> {
    await axios.post(url + "/friends", friend);
  }

  async UpdateFriend(friend: Friend): Promise<void> {
    await axios.put(url + "/friends", friend);
  }

  async DeleteFriend(id: number): Promise<void> {
    await axios.delete(url + "/friends/" + id);
  }
}

export default new FriendsService();
