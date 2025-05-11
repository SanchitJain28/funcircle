import * as React from 'react';

interface EmailTemplateProps {
    ticketName: string;
    orderId:string;
    ticket_quantity:number
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  ticketName,orderId,ticket_quantity
}) => (
  <div>
    <h1>Hey !! your Order is Confirmed {ticketName}! of order number {orderId}  X {ticket_quantity}</h1>
  </div>
);