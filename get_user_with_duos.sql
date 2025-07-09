create or replace function get_user_with_duos(p_user_id text)
returns jsonb
language plpgsql
as $$
declare
  profile_data jsonb := null;
  requester_duos jsonb := '[]'::jsonb;
  partner_duos jsonb := '[]'::jsonb;
  all_duos jsonb := '[]'::jsonb;
  current_duo jsonb := null;
begin
  -- Get minimal profile info
  select jsonb_build_object(
    'user_id', u.user_id,
    'first_name', u.first_name,
    'email', u.email,
    'usersetlevel', u.usersetlevel,
    'adminsetlevel', u.adminsetlevel
  )
  into profile_data
  from users u
  where u.user_id = p_user_id;

  if profile_data is null then
    return null;
  end if;

  -- Duos where user is requester
  select jsonb_agg(jsonb_build_object(
    'duo_id', d.id,
    'status', d.status,
    'created_at', d.created_at,
    'is_requester', true,
    'other_user', jsonb_build_object(
      'user_id', u.user_id,
      'first_name', u.first_name,
      'email', u.email,
      'usersetlevel', u.usersetlevel,
      'adminsetlevel', u.adminsetlevel
    )
  ))
  into requester_duos
  from duos d
  join users u on u.user_id = d.partner_id
  where d.requester_id = p_user_id;

  -- Duos where user is partner
  select jsonb_agg(jsonb_build_object(
    'duo_id', d.id,
    'status', d.status,
    'created_at', d.created_at,
    'is_requester', false,
    'other_user', jsonb_build_object(
      'user_id', u.user_id,
      'first_name', u.first_name,
      'email', u.email,
      'usersetlevel', u.usersetlevel,
      'adminsetlevel', u.adminsetlevel
    )
  ))
  into partner_duos
  from duos d
  join users u on u.user_id = d.requester_id
  where d.partner_id = p_user_id;

  -- Merge requester + partner duos
  all_duos := coalesce(requester_duos, '[]'::jsonb) || coalesce(partner_duos, '[]'::jsonb);

  -- Get current duo (accepted status)
  select jsonb_build_object(
    'duo_id', d.id,
    'status', d.status,
    'created_at', d.created_at,
    'is_requester', case when d.requester_id = p_user_id then true else false end,
    'other_user', jsonb_build_object(
      'user_id', u.user_id,
      'first_name', u.first_name,
      'email', u.email,
      'usersetlevel', u.usersetlevel,
      'adminsetlevel', u.adminsetlevel
    )
  )
  into current_duo
  from duos d
  join users u on u.user_id = case 
    when d.requester_id = p_user_id then d.partner_id 
    else d.requester_id 
  end
  where (d.requester_id = p_user_id or d.partner_id = p_user_id)
    and d.status = 'accepted'
  limit 1;

  -- Return final object
  return jsonb_build_object(
    'profile', profile_data,
    'duos', all_duos,
    'current_duo', current_duo
  );
end;
$$;