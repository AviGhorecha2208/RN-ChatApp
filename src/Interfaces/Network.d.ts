import { HttpStatusCode } from 'axios';

// Common Interfaces
export interface CommonApiResponse<T> {
  data: T;
  status_code: HttpStatusCode;
  message: string;
  status: number;
  status_text: string | null | undefined;
}

export type NavigateFunction = <T extends keyof ScreenParams>(
  screen: T,
  params?: ScreenParams[T],
) => void;

export type ErrorWithMessage = {
  message: string;
  error?: string;
};

export interface RegisterUserResponse {
  username: string;
  id: number | null;
  created_at: string;
  expires_at: string;
}

export interface Room {
  id: number;
  name: string;
  created_at: string;
  expires_at: string;
  is_active?: boolean;
}

export interface StatsResponse {
  total_rooms: number;
  total_users: number;
  active_rooms: Room[];
  active_users: string[];
}

export interface StatsPayload {
  total_rooms: number;
  total_users: number;
  active_rooms: Room[];
  active_users: { username: string; color: string }[];
}

export interface Message {
  content: string;
  created_at: string;
  id: number;
  color?: string;
  room_id: string;
  user_id: number | string;
  username: string;
}

export interface MessageEvent {
  content: string;
  created_at: string;
  id: number;
  room_id: string;
  user_id: number | string;
  username: string;
}
