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

export interface GameMember {
  id: string;
  name: string | null;
  connection: boolean;
}

export interface Game {
  id: number;
  title: string;
  created_at: string;
  members: GameMember[];
}

export interface UserGamesInfiniteData {
  pages: Game[][];
  pageParams: number[];
}

export interface SquadMember {
  member_id: string;
  member_name: string;
}

export interface Squad {
  id: string;
  squad_name: string;
  squad_members: SquadMember[];
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  venue_id: number;
  playing_date_and_time: {
    playingDays: string[];
    playingTime: string;
  };
  type: string;
  created_at: string; // ISO timestamp string
  updated_at: string;
  end_date: string;
}

export interface SubscriptionPlayingDateTime {
  playingDays: string[];
  playingTime: string; // e.g., "10:00 PM"
}

export interface Subscription {
  id: string;
  type: string;
  venue_id: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  playing_date_and_time: SubscriptionPlayingDateTime;
}

export interface Subject {
  subscription: Subscription | null;
  isUsed: boolean;
}

export interface RecentMembersProps {
  member_name: string;
  member_id: string;
}

export interface GameRequest {
  id: string;
  sender: string;
  reciever: string;
  type: "game-request"; // literal type since it's fixed
  data: {
    game_date: string; // ISO 8601 date string
    game_link: string;
    game_name: string;
    game_time: string; // ISO 8601 date string
  };
  created_at: string; // ISO 8601 timestamp
}


export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme?: {
    color?: string;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayError {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string;
    };
  };
}

export interface RazorpayInstance {
  open(): void;
  on(event: "payment.failed", callback: (response: RazorpayError) => void): void;
}

export interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}
