export interface Event {
  name: string;
  profile_image: string;
  location: string;
  interests: string[];
  group_id: number;
}

export interface TicketType {
  id: number;
  bookedtickets: number;
  capacity: number;
  ticketstatus: string;
  type: string;
  title: string;
  location: string;
  price: string;
  availablecapacity: number;
  description: string;
  enddatetime: Date;
  startdatetime: Date;
  group_id: number;
  venueid: {
    images: string[];
    info: string;
    location: string;
    maps_link: string;
    venue_name: string;
  };
}

export interface DuoRequest {
  duo_id: string;
  status: string;
  created_at: string;
  is_requester: boolean;
  other_user: UserProfile;
}

export interface UserProfile {
  user_id: string;
  first_name: string | null;
  email: string | null;
  usersetlevel: string | null;
  adminsetlevel: string | null;
  location: string | null;
}
