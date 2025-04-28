
create table public.candidates (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    email text not null,
    phone text,
    position text not null
);

create table public.evaluations (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    candidate_id uuid references public.candidates(id) not null,
    technical_score integer not null check (technical_score >= 0 and technical_score <= 100),
    soft_skills_score integer not null check (soft_skills_score >= 0 and soft_skills_score <= 100),
    experience_score integer not null check (experience_score >= 0 and experience_score <= 100),
    culture_fit_score integer not null check (culture_fit_score >= 0 and culture_fit_score <= 100),
    comments text,
    evaluator_id uuid references auth.users(id) not null,
    fit_score numeric generated always as (
        (technical_score + soft_skills_score + experience_score + culture_fit_score)::numeric / 4
    ) stored
);

-- Políticas de segurança (RLS)
alter table public.candidates enable row level security;
alter table public.evaluations enable row level security;

-- Políticas para candidatos
create policy "Candidatos são visíveis para usuários autenticados"
    on public.candidates
    for select
    to authenticated
    using (true);

create policy "Apenas usuários autenticados podem criar candidatos"
    on public.candidates
    for insert
    to authenticated
    with check (true);

-- Políticas para avaliações
create policy "Avaliações são visíveis para usuários autenticados"
    on public.evaluations
    for select
    to authenticated
    using (true);

create policy "Apenas usuários autenticados podem criar avaliações"
    on public.evaluations
    for insert
    to authenticated
    with check (true);

create policy "Usuários só podem editar suas próprias avaliações"
    on public.evaluations
    for update
    to authenticated
    using (auth.uid() = evaluator_id);

