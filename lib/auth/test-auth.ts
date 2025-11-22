export interface TestUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'leader' | 'volunteer'
  church_id?: string
}

const TEST_USERS: TestUser[] = [
  {
    id: 'test-admin-001',
    email: 'admin@test.com',
    name: 'Admin Teste',
    role: 'admin',
    church_id: 'test-church-001'
  },
  {
    id: 'test-leader-001',
    email: 'leader@test.com',
    name: 'Líder Teste',
    role: 'leader',
    church_id: 'test-church-001'
  },
  {
    id: 'test-volunteer-001',
    email: 'volunteer@test.com',
    name: 'Voluntário Teste',
    role: 'volunteer',
    church_id: 'test-church-001'
  }
]

export function getTestUserById(id: string): TestUser | undefined {
  return TEST_USERS.find(user => user.id === id)
}

export function getTestUserByEmail(email: string): TestUser | undefined {
  return TEST_USERS.find(user => user.email === email)
}

