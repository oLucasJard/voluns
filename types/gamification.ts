/**
 * 🎮 GAMIFICATION TYPES
 * Tipos TypeScript para o sistema de gamificação
 */

export interface VolunteerPoints {
  id: string
  volunteer_id: string
  church_id: string
  total_points: number
  lifetime_points: number
  points_spent: number
  level: number
  level_progress: number
  created_at: string
  updated_at: string
}

export interface PointTransaction {
  id: string
  volunteer_id: string
  church_id: string
  points: number
  transaction_type: 'earned' | 'spent' | 'bonus' | 'penalty' | 'adjustment'
  reason: string
  event_id?: string
  assignment_id?: string
  badge_id?: string
  metadata?: Record<string, any>
  created_at: string
  created_by?: string
}

export interface Badge {
  id: string
  church_id?: string
  name: string
  description?: string
  icon?: string
  color?: string
  badge_type: 'milestone' | 'achievement' | 'special' | 'seasonal'
  category?: string
  requirement_type: string
  requirement_value?: number
  requirement_details?: Record<string, any>
  points_reward: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  is_active: boolean
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface VolunteerBadge {
  id: string
  volunteer_id: string
  badge_id: string
  church_id: string
  earned_at: string
  progress: number
  is_displayed: boolean
  display_order: number
  metadata?: Record<string, any>
  badge?: Badge
}

export interface VolunteerStreak {
  id: string
  volunteer_id: string
  church_id: string
  current_streak: number
  current_streak_start?: string
  current_streak_end?: string
  best_streak: number
  best_streak_start?: string
  best_streak_end?: string
  streak_type: 'daily' | 'weekly' | 'monthly' | 'event_based'
  last_activity_date?: string
  created_at: string
  updated_at: string
}

export interface LeaderboardEntry {
  volunteer_id: string
  volunteer_name: string
  church_id: string
  ministry_id?: string
  rank: number
  previous_rank?: number
  metric_type: 'points' | 'events' | 'hours' | 'streak'
  metric_value: number
  total_points?: number
  level?: number
  events_count?: number
}

export interface Challenge {
  id: string
  church_id: string
  title: string
  description?: string
  icon?: string
  challenge_type: 'individual' | 'team' | 'church_wide'
  goal_type: string
  goal_target: number
  points_reward: number
  badge_reward?: string
  start_date: string
  end_date: string
  is_active: boolean
  participants_count?: number
  created_at: string
  updated_at: string
}

export interface ChallengeParticipant {
  id: string
  challenge_id: string
  volunteer_id: string
  current_progress: number
  progress_percentage: number
  status: 'active' | 'completed' | 'failed' | 'abandoned'
  completed_at?: string
  reward_claimed: boolean
  joined_at: string
  updated_at: string
  challenge?: Challenge
}

export interface GamificationStats {
  points: VolunteerPoints
  badges: VolunteerBadge[]
  streak: VolunteerStreak | null
  rank: {
    pointsRank: number | null
    eventsRank: number | null
    totalVolunteers: number
  }
  recentTransactions: PointTransaction[]
}


