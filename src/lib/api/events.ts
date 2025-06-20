import axios from "axios";

export interface Event {
  name: string;
  profile_image: string;
  location: string;
  interests: string[];
  group_id: number;
}
const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";


export const fetchEventsByCategory: (category: string) => Promise<Event[]> = async (category: string): Promise<Event[]> => {
  const { data } = await axios.post(`${baseURL}/api/FetchEvents`, {
    group_type: category,
  });
  return data.data;
};