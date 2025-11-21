export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  role: UserRole
  church_id?: string
  created_at: string
  updated_at: string
}

export type UserRole = 'admin' | 'leader' | 'volunteer'

export interface Church {
  id: string
  name: string
  description?: string
  logo_url?: string
  address?: string
  phone?: string
  email?: string
  plan: SubscriptionPlan
  created_at: string
  updated_at: string
}

export type SubscriptionPlan = 'essential' | 'growth' | 'pro'

export interface Ministry {
  id: string
  church_id: string
  name: string
  description?: string
  leader_id: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Volunteer {
  id: string
  user_id: string
  ministry_id: string
  position?: string
  skills?: string[]
  is_active: boolean
  joined_at: string
}

export interface Event {
  id: string
  church_id: string
  ministry_id: string
  name: string
  description?: string
  date: string
  start_time?: string
  end_time?: string
  location?: string
  status: EventStatus
  created_by: string
  created_at: string
  updated_at: string
}

export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed'

export interface EventPosition {
  id: string
  event_id: string
  name: string
  description?: string
  required_count: number
  assigned_count: number
  skills_required?: string[]
}

export interface EventAssignment {
  id: string
  event_id: string
  position_id: string
  volunteer_id: string
  status: AssignmentStatus
  assigned_at: string
  responded_at?: string
  notes?: string
}

export type AssignmentStatus = 'pending' | 'accepted' | 'declined' | 'no_response'

export interface Unavailability {
  id: string
  volunteer_id: string
  start_date: string
  end_date: string
  reason?: string
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, any>
  is_read: boolean
  created_at: string
}

export type NotificationType = 'event_assignment' | 'event_reminder' | 'event_cancelled' | 'ministry_update' | 'system'

export interface PlanLimits {
  max_volunteers: number
  max_ministries: number
  max_events_per_month: number
  features: string[]
}

export interface StripeCustomer {
  id: string
  church_id: string
  stripe_customer_id: string
  subscription_id?: string
  status: string
  current_period_end?: string
  created_at: string
  updated_at: string
}

// Form types
export interface CreateEventForm {
  name: string
  description?: string
  date: string
  start_time?: string
  end_time?: string
  location?: string
  positions: CreatePositionForm[]
}

export interface CreatePositionForm {
  name: string
  description?: string
  required_count: number
  skills_required?: string[]
}

export interface UpdateAssignmentForm {
  status: AssignmentStatus
  notes?: string
}

export interface CreateUnavailabilityForm {
  start_date: string
  end_date: string
  reason?: string
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  has_more: boolean
}

// Dashboard types
export interface DashboardStats {
  total_volunteers: number
  active_events: number
  upcoming_events: number
  pending_assignments: number
}

export interface EventWithAssignments extends Event {
  positions: EventPosition[]
  assignments: EventAssignment[]
  volunteer_count: number
  confirmed_count: number
}

