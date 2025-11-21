-- ============================================
-- VOLUNS - SETUP BANCO DE DADOS SUPABASE
-- ============================================
-- Execute este arquivo no SQL Editor do Supabase
-- Tempo estimado: 1-2 minutos
-- ============================================

-- EXTENSÕES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TIPOS ENUM
CREATE TYPE user_role AS ENUM ('admin', 'leader', 'volunteer');
CREATE TYPE subscription_plan AS ENUM ('essential', 'growth', 'pro');
CREATE TYPE event_status AS ENUM ('draft', 'published', 'cancelled', 'completed');
CREATE TYPE assignment_status AS ENUM ('pending', 'accepted', 'declined', 'no_response');
CREATE TYPE notification_type AS ENUM ('event_assignment', 'event_reminder', 'event_cancelled', 'ministry_update', 'system');

-- ============================================
-- TABELAS
-- ============================================

-- CHURCHES (Igrejas)
CREATE TABLE churches (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    logo_url TEXT,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    plan subscription_plan DEFAULT 'essential',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- USERS (Usuários)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'volunteer',
    church_id UUID REFERENCES churches(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MINISTRIES (Ministérios)
CREATE TABLE ministries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    church_id UUID NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    leader_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- VOLUNTEERS (Voluntários)
CREATE TABLE volunteers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ministry_id UUID NOT NULL REFERENCES ministries(id) ON DELETE CASCADE,
    position VARCHAR(255),
    skills TEXT[],
    is_active BOOLEAN DEFAULT true,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, ministry_id)
);

-- EVENTS (Eventos)
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    church_id UUID NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
    ministry_id UUID NOT NULL REFERENCES ministries(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    location VARCHAR(255),
    status event_status DEFAULT 'draft',
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ASSIGNMENTS (Atribuições)
CREATE TABLE assignments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    volunteer_id UUID NOT NULL REFERENCES volunteers(id) ON DELETE CASCADE,
    position VARCHAR(255),
    status assignment_status DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, volunteer_id)
);

-- NOTIFICATIONS (Notificações)
CREATE TABLE notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX idx_users_church_id ON users(church_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_ministries_church_id ON ministries(church_id);
CREATE INDEX idx_ministries_leader_id ON ministries(leader_id);
CREATE INDEX idx_volunteers_user_id ON volunteers(user_id);
CREATE INDEX idx_volunteers_ministry_id ON volunteers(ministry_id);
CREATE INDEX idx_events_church_id ON events(church_id);
CREATE INDEX idx_events_ministry_id ON events(ministry_id);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_assignments_event_id ON assignments(event_id);
CREATE INDEX idx_assignments_volunteer_id ON assignments(volunteer_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS
ALTER TABLE churches ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ministries ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- POLICIES: Churches
CREATE POLICY "Users can view their church"
    ON churches FOR SELECT
    USING (id IN (SELECT church_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Admins can update their church"
    ON churches FOR UPDATE
    USING (id IN (SELECT church_id FROM users WHERE id = auth.uid() AND role = 'admin'));

-- POLICIES: Users
CREATE POLICY "Users can view users in their church"
    ON users FOR SELECT
    USING (church_id IN (SELECT church_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can update their own profile"
    ON users FOR UPDATE
    USING (id = auth.uid());

CREATE POLICY "Admins can insert users"
    ON users FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin' AND church_id = users.church_id
    ));

-- POLICIES: Ministries
CREATE POLICY "Users can view ministries in their church"
    ON ministries FOR SELECT
    USING (church_id IN (SELECT church_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Admins and leaders can manage ministries"
    ON ministries FOR ALL
    USING (church_id IN (
        SELECT church_id FROM users WHERE id = auth.uid() AND role IN ('admin', 'leader')
    ));

-- POLICIES: Volunteers
CREATE POLICY "Users can view volunteers in their church"
    ON volunteers FOR SELECT
    USING (ministry_id IN (
        SELECT m.id FROM ministries m
        INNER JOIN users u ON u.church_id = m.church_id
        WHERE u.id = auth.uid()
    ));

CREATE POLICY "Admins and leaders can manage volunteers"
    ON volunteers FOR ALL
    USING (ministry_id IN (
        SELECT m.id FROM ministries m
        INNER JOIN users u ON u.church_id = m.church_id
        WHERE u.id = auth.uid() AND u.role IN ('admin', 'leader')
    ));

-- POLICIES: Events
CREATE POLICY "Users can view events in their church"
    ON events FOR SELECT
    USING (church_id IN (SELECT church_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Admins and leaders can manage events"
    ON events FOR ALL
    USING (church_id IN (
        SELECT church_id FROM users WHERE id = auth.uid() AND role IN ('admin', 'leader')
    ));

-- POLICIES: Assignments
CREATE POLICY "Users can view assignments in their church"
    ON assignments FOR SELECT
    USING (event_id IN (
        SELECT e.id FROM events e
        INNER JOIN users u ON u.church_id = e.church_id
        WHERE u.id = auth.uid()
    ));

CREATE POLICY "Volunteers can update their assignments"
    ON assignments FOR UPDATE
    USING (volunteer_id IN (SELECT id FROM volunteers WHERE user_id = auth.uid()));

CREATE POLICY "Admins and leaders can manage assignments"
    ON assignments FOR ALL
    USING (event_id IN (
        SELECT e.id FROM events e
        INNER JOIN users u ON u.church_id = e.church_id
        WHERE u.id = auth.uid() AND u.role IN ('admin', 'leader')
    ));

-- POLICIES: Notifications
CREATE POLICY "Users can view their notifications"
    ON notifications FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can update their notifications"
    ON notifications FOR UPDATE
    USING (user_id = auth.uid());

CREATE POLICY "Admins and leaders can send notifications"
    ON notifications FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'leader')
    ));

-- ============================================
-- TRIGGERS
-- ============================================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger nas tabelas
CREATE TRIGGER update_churches_updated_at
    BEFORE UPDATE ON churches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ministries_updated_at
    BEFORE UPDATE ON ministries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assignments_updated_at
    BEFORE UPDATE ON assignments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DADOS DE TESTE (OPCIONAL)
-- ============================================

-- Igreja de teste
INSERT INTO churches (id, name, description, plan)
VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'Igreja Teste',
    'Igreja para testes do sistema',
    'essential'
);

-- ============================================
-- FIM DO SETUP
-- ============================================

SELECT 
    '✅ Setup concluído com sucesso!' as status,
    'Tabelas criadas: ' || COUNT(*)::text as resultado
FROM information_schema.tables 
WHERE table_schema = 'public'
AND table_name IN ('churches', 'users', 'ministries', 'volunteers', 'events', 'assignments', 'notifications');


