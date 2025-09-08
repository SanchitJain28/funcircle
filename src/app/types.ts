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
  servicecharge: string;
  venueid: {
    id: number;
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
  on(
    event: "payment.failed",
    callback: (response: RazorpayError) => void
  ): void;
}

export interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}

interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: any;
    timestamp: string;
    path: string;
  };
}

interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface TicketMemberNew {
  tag: string | null;
  email: string;
  user_id: string;
  first_name: string;
  usersetlevel: string;
  adminsetlevel: string | null;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface Review {
  id: number;
  rating: number;
  to_user_id: string;
  from_user_id: string;
  ticket_id: number;
  created_at: string;
  updated_at: string;
}

export interface Venue {
  id: number;
  venue_name: string;
  images: string[];
  maps_link: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  group_id: number;
}

export interface TicketInfo {
  description: string;
  group_id: number;
  id: number;
  images: string[] | null;
  location: string | null;
  price: string;
  servicecharge: string | null;
  startdatetime: string; // ISO date string
  enddatetime: string; // ISO date string
  title: string;
  venue: Venue;
}

export interface ChatRoom {
  id: string;
  name?: string;
  description?: string;
  type: "single" | "group";
  sport_type?: string;
  avatar_url?: string;
  created_at: string;
  member_count?: number;
  last_message_content?: string;
  last_message_at?: string;
  unread_count?: number;
  created_by: {
    first_name: string;
  };
  venue_id : number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta_data :any
}

export interface ChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  content?: string;
  message_type:
    | "text"
    | "image"
    | "video"
    | "file"
    | "match_share"
    | "ticket_share"
    | "system";
  media_url?: string;
  shared_match_id?: string;
  shared_ticket_id?: string;
  sent_at: string;
  sender_name?: string;
  sender_avatar?: string;
  reactions?: Record<string, number>;
  user :{
    id:string
    username:string
  }
}
