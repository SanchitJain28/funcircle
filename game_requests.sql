create table public.game_requests (
    id uuid not null default gen_random_uuid (),
    sender text not null,
    reciever text not null,
    type text not null,
    data jsonb null,
    created_at timestamp with time zone not null default now(),
    constraint game_requests_pkey primary key (id),
    constraint fk_sender foreign KEY (sender) references users (user_id) on delete CASCADE,
    constraint fk_reciever foreign KEY (reciever) references users (user_id) on delete CASCADE
) TABLESPACE pg_default;