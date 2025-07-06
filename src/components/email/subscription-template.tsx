import type * as React from "react";

interface SubscriptionConfirmationProps {
  venue_id: string;
  playing_date_and_time: string;
  type: string;
  venue_name?: string;
  venue_address?: string;
  subscription_id?: string;
  customer_name?: string;
  customer_email?: string;
  price?: string;
}

export const SubscriptionConfirmationTemplate: React.FC<
  Readonly<SubscriptionConfirmationProps>
> = ({
  venue_id,
  playing_date_and_time,
  type,
  venue_name,
  venue_address,
  customer_name,
  customer_email,
  price,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    }}
  >
    {/* Header */}
    <div
      style={{
        backgroundColor: "#10b981",
        color: "white",
        padding: "20px",
        borderRadius: "8px 8px 0 0",
        textAlign: "center",
      }}
    >
      <h1 style={{ margin: "0", fontSize: "24px" }}>Subscription Confirmed!</h1>
      <p style={{ margin: "10px 0 0 0", fontSize: "16px", opacity: "0.9" }}>
        Welcome to your new subscription
      </p>
    </div>

    {/* Content */}
    <div style={{ padding: "20px" }}>
      <p style={{ fontSize: "16px", color: "#4b5563", marginBottom: "20px" }}>
        Great news! Your subscription has been successfully confirmed. Here are
        the details:
      </p>

      {/* Subscription Details */}
      <div
        style={{
          backgroundColor: "#f0fdf4",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "20px",
          border: "1px solid #bbf7d0",
        }}
      >
        <h2
          style={{ margin: "0 0 15px 0", color: "#059669", fontSize: "18px" }}
        >
          Subscription Details
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ padding: "8px 0", color: "#6b7280", width: "40%" }}>
                Subscription Type:
              </td>
              <td
                style={{
                  padding: "8px 0",
                  fontWeight: "bold",
                  color: "#111827",
                }}
              >
                {type}
              </td>
            </tr>
            {/* {subscription_id && (
              <tr>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  Subscription ID:
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#111827",
                  }}
                >
                  {subscription_id}
                </td>
              </tr>
            )} */}
            <tr>
              <td style={{ padding: "8px 0", color: "#6b7280" }}>Venue ID:</td>
              <td
                style={{
                  padding: "8px 0",
                  fontWeight: "bold",
                  color: "#111827",
                }}
              >
                {venue_id}
              </td>
            </tr>
            {venue_name && (
              <tr>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>
                  Venue Name:
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#111827",
                  }}
                >
                  {venue_name}
                </td>
              </tr>
            )}
            <tr>
              <td style={{ padding: "8px 0", color: "#6b7280" }}>
                Playing Date & Time:
              </td>
              <td
                style={{
                  padding: "8px 0",
                  fontWeight: "bold",
                  color: "#111827",
                }}
              >
                {playing_date_and_time}
              </td>
            </tr>
            {price && (
              <tr>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>Price:</td>
                <td
                  style={{
                    padding: "8px 0",
                    fontWeight: "bold",
                    color: "#111827",
                  }}
                >
                  {price}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Customer Information */}
      {(customer_name || customer_email) && (
        <div
          style={{
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{ margin: "0 0 15px 0", color: "#374151", fontSize: "16px" }}
          >
            Customer Information
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {customer_name && (
                <tr>
                  <td
                    style={{ padding: "8px 0", color: "#6b7280", width: "40%" }}
                  >
                    Name:
                  </td>
                  <td
                    style={{
                      padding: "8px 0",
                      fontWeight: "bold",
                      color: "#111827",
                    }}
                  >
                    {customer_name}
                  </td>
                </tr>
              )}
              {customer_email && (
                <tr>
                  <td style={{ padding: "8px 0", color: "#6b7280" }}>Email:</td>
                  <td
                    style={{
                      padding: "8px 0",
                      fontWeight: "bold",
                      color: "#111827",
                    }}
                  >
                    {customer_email}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Venue Location */}
      {venue_address && (
        <div
          style={{
            backgroundColor: "#fef3c7",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
            border: "1px solid #fcd34d",
          }}
        >
          <h3
            style={{ margin: "0 0 15px 0", color: "#d97706", fontSize: "16px" }}
          >
            Venue Location
          </h3>
          <p style={{ margin: "0", color: "#92400e", fontWeight: "500" }}>
            {venue_address}
          </p>
        </div>
      )}

      {/* Next Steps */}
      <div
        style={{
          backgroundColor: "#eff6ff",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "20px",
          border: "1px solid #bfdbfe",
        }}
      >
        <h3
          style={{ margin: "0 0 15px 0", color: "#1d4ed8", fontSize: "16px" }}
        >
          What is Next?
        </h3>
        <ul style={{ margin: "0", paddingLeft: "20px", color: "#1e40af" }}>
          <li style={{ marginBottom: "8px" }}>
            Save this confirmation email for your records
          </li>
          <li style={{ marginBottom: "8px" }}>
            Mark your calendar for the playing date and time
          </li>
          <li style={{ marginBottom: "8px" }}>
            Arrive at the venue 15 minutes before your scheduled time
          </li>
          <li>
            Contact us if you need to make any changes to your subscription
          </li>
        </ul>
      </div>
    </div>

    {/* Footer */}
    <div
      style={{
        borderTop: "1px solid #e5e7eb",
        padding: "20px",
        textAlign: "center",
        color: "#6b7280",
        fontSize: "14px",
      }}
    >
      <p style={{ margin: "0 0 15px 0" }}>
        Thank you for choosing our service! If you have any questions about your
        subscription, please do not hesitate to contact our support team.
      </p>
      <div style={{ marginTop: "15px" }}>
        <a
          href="#"
          style={{
            color: "#10b981",
            marginRight: "15px",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Contact Support : +919561079271
        </a>
        <a
          href="#"
          style={{
            color: "#10b981",
            marginRight: "15px",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Manage Subscription
        </a>
        <a
          href="#"
          style={{
            color: "#10b981",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Terms & Conditions
        </a>
      </div>
      <p style={{ margin: "15px 0 0 0", fontSize: "12px", color: "#9ca3af" }}>
        © 2024 Your Company Name. All rights reserved.
      </p>
    </div>
  </div>
);
