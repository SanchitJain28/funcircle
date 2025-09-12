CREATE OR REPLACE FUNCTION get_user_games_list(p_user_id TEXT)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN (
    SELECT COALESCE(jsonb_agg(
      jsonb_build_object(
        'title', t.title,
        'startdatetime', t.startdatetime,
        'status', t.ticketstatus,
        'ticket_id', t.id,
        'venue_id',t.venueid
      )
    ), '[]'::jsonb)
    FROM public.tickets t
    JOIN public."Orderitems" oi ON t.id = oi.ticket_id
    WHERE oi.userid = p_user_id
    ORDER BY t.startdatetime DESC
  );
END;
$$;