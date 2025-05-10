import * as React from 'react';

interface EmailTemplateProps {
    ticketName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  ticketName,
}) => (
  <div>
    <h1>Hey !! your Order is Confirmed {ticketName}!</h1>
  </div>
);