// Schema GraphQL para Voluns
// Implementação inspirada em GitHub, Shopify e Stripe

import { gql } from 'graphql-tag'

// Tipos escalares customizados
export const scalarTypes = gql`
  scalar Date
  scalar Time
  scalar DateTime
  scalar JSON
`

// Tipos de entrada (Input Types)
export const inputTypes = gql`
  input UserInput {
    name: String!
    email: String!
    password: String!
    church_id: ID
    role: UserRole = VOLUNTEER
  }

  input UserUpdateInput {
    name: String
    avatar_url: String
  }

  input ChurchInput {
    name: String!
    description: String
    logo_url: String
    address: String
    phone: String
    email: String
    plan: ChurchPlan = ESSENTIAL
  }

  input MinistryInput {
    church_id: ID!
    name: String!
    description: String
    leader_id: ID!
    is_active: Boolean = true
  }

  input VolunteerInput {
    user_id: ID!
    ministry_id: ID!
    position: String
    skills: [String!]
    is_active: Boolean = true
  }

  input EventInput {
    church_id: ID!
    ministry_id: ID!
    name: String!
    description: String
    date: Date!
    start_time: Time
    end_time: Time
    location: String
    status: EventStatus = DRAFT
  }

  input EventPositionInput {
    event_id: ID!
    name: String!
    description: String
    required_skills: [String!]
    max_volunteers: Int = 1
    is_required: Boolean = true
  }

  input EventAssignmentInput {
    event_id: ID!
    volunteer_id: ID!
    position_id: ID!
    status: AssignmentStatus = PENDING
    notes: String
  }

  input NotificationInput {
    user_id: ID!
    type: NotificationType!
    priority: NotificationPriority = MEDIUM
    title: String!
    message: String!
    data: JSON
    expires_at: DateTime
  }

  input PaginationInput {
    page: Int = 1
    limit: Int = 10
  }

  input EventFilterInput {
    status: EventStatus
    ministry_id: ID
    date_from: Date
    date_to: Date
  }

  input VolunteerFilterInput {
    ministry_id: ID
    is_active: Boolean
    skills: [String!]
  }
`

// Enums
export const enums = gql`
  enum UserRole {
    ADMIN
    LEADER
    VOLUNTEER
  }

  enum ChurchPlan {
    ESSENTIAL
    GROWTH
    PRO
  }

  enum EventStatus {
    DRAFT
    PUBLISHED
    CANCELLED
    COMPLETED
  }

  enum AssignmentStatus {
    PENDING
    ACCEPTED
    DECLINED
    NO_RESPONSE
  }

  enum NotificationType {
    EVENT_ASSIGNMENT
    EVENT_REMINDER
    EVENT_CANCELLED
    MINISTRY_UPDATE
    SYSTEM
  }

  enum NotificationPriority {
    LOW
    MEDIUM
    HIGH
    URGENT
  }
`

// Tipos principais
export const types = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    avatar_url: String
    role: UserRole!
    church_id: ID
    church: Church
    created_at: DateTime!
    updated_at: DateTime!
    volunteer_profile: Volunteer
  }

  type Church {
    id: ID!
    name: String!
    description: String
    logo_url: String
    address: String
    phone: String
    email: String
    plan: ChurchPlan!
    created_at: DateTime!
    updated_at: DateTime!
    users: [User!]!
    ministries: [Ministry!]!
    events: [Event!]!
  }

  type Ministry {
    id: ID!
    church_id: ID!
    name: String!
    description: String
    leader_id: ID!
    is_active: Boolean!
    created_at: DateTime!
    updated_at: DateTime!
    church: Church!
    leader: User!
    volunteers: [Volunteer!]!
    events: [Event!]!
  }

  type Volunteer {
    id: ID!
    user_id: ID!
    ministry_id: ID!
    position: String
    skills: [String!]!
    is_active: Boolean!
    joined_at: DateTime!
    user: User!
    ministry: Ministry!
    assignments: [EventAssignment!]!
  }

  type Event {
    id: ID!
    church_id: ID!
    ministry_id: ID!
    name: String!
    description: String
    date: Date!
    start_time: Time
    end_time: Time
    location: String
    status: EventStatus!
    created_by: ID!
    created_at: DateTime!
    updated_at: DateTime!
    church: Church!
    ministry: Ministry!
    positions: [EventPosition!]!
    assignments: [EventAssignment!]!
    creator: User!
  }

  type EventPosition {
    id: ID!
    event_id: ID!
    name: String!
    description: String
    required_skills: [String!]!
    max_volunteers: Int!
    is_required: Boolean!
    created_at: DateTime!
    event: Event!
    assignments: [EventAssignment!]!
  }

  type EventAssignment {
    id: ID!
    event_id: ID!
    volunteer_id: ID!
    position_id: ID!
    status: AssignmentStatus!
    notes: String
    assigned_at: DateTime!
    confirmed_at: DateTime
    event: Event!
    volunteer: Volunteer!
    position: EventPosition!
  }

  type Notification {
    id: ID!
    user_id: ID!
    type: NotificationType!
    priority: NotificationPriority!
    title: String!
    message: String!
    data: JSON
    is_read: Boolean!
    expires_at: DateTime
    created_at: DateTime!
    user: User!
  }

  type PaginatedEvents {
    data: [Event!]!
    total: Int!
    page: Int!
    limit: Int!
    has_more: Boolean!
  }

  type PaginatedVolunteers {
    data: [Volunteer!]!
    total: Int!
    page: Int!
    limit: Int!
    has_more: Boolean!
  }

  type DashboardStats {
    total_volunteers: Int!
    active_events: Int!
    upcoming_events: Int!
    pending_assignments: Int!
    confirmed_assignments: Int!
    last_event_date: Date
    next_event_date: Date
  }
`

// Queries
export const queries = gql`
  type Query {
    # Usuário atual
    me: User

    # Igreja
    church(id: ID!): Church
    myChurch: Church

    # Ministérios
    ministries(church_id: ID!): [Ministry!]!
    ministry(id: ID!): Ministry

    # Voluntários
    volunteers(
      church_id: ID!
      filter: VolunteerFilterInput
      pagination: PaginationInput
    ): PaginatedVolunteers!
    volunteer(id: ID!): Volunteer

    # Eventos
    events(
      church_id: ID!
      filter: EventFilterInput
      pagination: PaginationInput
    ): PaginatedEvents!
    event(id: ID!): Event

    # Atribuições
    assignments(event_id: ID): [EventAssignment!]!
    assignment(id: ID!): EventAssignment

    # Notificações
    notifications(user_id: ID!): [Notification!]!
    notification(id: ID!): Notification

    # Dashboard
    dashboardStats(church_id: ID!): DashboardStats!
  }
`

// Mutations
export const mutations = gql`
  type Mutation {
    # Usuário
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserUpdateInput!): User!
    deleteUser(id: ID!): Boolean!

    # Igreja
    createChurch(input: ChurchInput!): Church!
    updateChurch(id: ID!, input: ChurchInput!): Church!

    # Ministério
    createMinistry(input: MinistryInput!): Ministry!
    updateMinistry(id: ID!, input: MinistryInput!): Ministry!
    deleteMinistry(id: ID!): Boolean!

    # Voluntário
    createVolunteer(input: VolunteerInput!): Volunteer!
    updateVolunteer(id: ID!, input: VolunteerInput!): Volunteer!
    deleteVolunteer(id: ID!): Boolean!

    # Evento
    createEvent(input: EventInput!): Event!
    updateEvent(id: ID!, input: EventInput!): Event!
    deleteEvent(id: ID!): Boolean!

    # Posição de evento
    createEventPosition(input: EventPositionInput!): EventPosition!
    updateEventPosition(id: ID!, input: EventPositionInput!): EventPosition!
    deleteEventPosition(id: ID!): Boolean!

    # Atribuição
    createEventAssignment(input: EventAssignmentInput!): EventAssignment!
    updateEventAssignment(id: ID!, input: EventAssignmentInput!): EventAssignment!
    deleteEventAssignment(id: ID!): Boolean!

    # Notificação
    createNotification(input: NotificationInput!): Notification!
    markNotificationAsRead(id: ID!): Notification!
    deleteNotification(id: ID!): Boolean!
  }
`

// Schema completo
export const typeDefs = gql`
  ${scalarTypes}
  ${enums}
  ${inputTypes}
  ${types}
  ${queries}
  ${mutations}
`


