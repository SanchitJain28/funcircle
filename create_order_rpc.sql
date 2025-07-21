CREATE OR REPLACE FUNCTION create_order_and_update_tickets(
    p_user_id uuid,
    p_total_price numeric,
    p_status text,
    p_paymentid text,
    p_ticket_id int,
    p_ticket_quantity int,
    p_ticket_price numeric
)
RETURNS int -- The new order ID
LANGUAGE plpgsql
AS $$
DECLARE
    new_order_id int;
BEGIN
    -- 1. Create an order and get the new order ID
    INSERT INTO public.orders (user_id, total_price, status, paymentid)
    VALUES (p_user_id, p_total_price, p_status, p_paymentid)
    RETURNING id INTO new_order_id;

    -- 2. Increment the booked tickets count
    PERFORM increment_bookedtickets(p_ticket_id, p_ticket_quantity);

    -- 3. Create order items
    INSERT INTO public."Orderitems" (order_id, ticket_id, quantity, sub_price, userid)
    VALUES (new_order_id, p_ticket_id, p_ticket_quantity, p_ticket_price, p_user_id);

    -- 4. Return the new order ID
    RETURN new_order_id;
END;
$$;
