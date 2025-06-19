import type * as React from "react"

interface EmailTemplateProps {
  ticketName: string
  orderId: string
  ticket_quantity: number
  location?: string
  map_link?: string
  name?: string
  phoneNumber?: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  ticketName,
  orderId,
  ticket_quantity,
  location,
  map_link,
  name,
  phoneNumber,
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
        backgroundColor: "#6366f1",
        color: "white",
        padding: "20px",
        borderRadius: "8px 8px 0 0",
        textAlign: "center",
      }}
    >
      <h1 style={{ margin: "0", fontSize: "24px" }}>Order Confirmation</h1>
    </div>

    {/* Content */}
    <div style={{ padding: "20px" }}>
      <p style={{ fontSize: "16px", color: "#4b5563" }}>Thank you for your purchase! Your order has been confirmed.</p>

      {/* Order Details */}
      <div
        style={{
          backgroundColor: "#f9fafb",
          borderRadius: "8px",
          padding: "15px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: "0 0 15px 0", color: "#4f46e5", fontSize: "18px" }}>Order Details</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ padding: "8px 0", color: "#6b7280", width: "40%" }}>Ticket Name:</td>
              <td style={{ padding: "8px 0", fontWeight: "bold", color: "#111827" }}>{ticketName}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", color: "#6b7280" }}>Order Number:</td>
              <td style={{ padding: "8px 0", fontWeight: "bold", color: "#111827" }}>{orderId}</td>
            </tr>
            {name && (
              <tr>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>Name:</td>
                <td style={{ padding: "8px 0", fontWeight: "bold", color: "#111827" }}>{name}</td>
              </tr>
            )}
            {phoneNumber && (
              <tr>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>Phone Number:</td>
                <td style={{ padding: "8px 0", fontWeight: "bold", color: "#111827" }}>{phoneNumber}</td>
              </tr>
            )}
            <tr>
              <td style={{ padding: "8px 0", color: "#6b7280" }}>Quantity:</td>
              <td style={{ padding: "8px 0", fontWeight: "bold", color: "#111827" }}>{ticket_quantity}</td>
            </tr>
            {location && (
              <tr>
                <td style={{ padding: "8px 0", color: "#6b7280" }}>Location:</td>
                <td style={{ padding: "8px 0", fontWeight: "bold", color: "#111827" }}>{location}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Location Link (QR code removed) */}
      {map_link && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ margin: "0 0 15px 0", color: "#4f46e5", fontSize: "16px" }}>Event Location</h3>
          <a
            href={map_link}
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#4f46e5",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            Open Map
          </a>
        </div>
      )}
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
      <p>If you have any questions, please contact our support team.</p>
      <div style={{ marginTop: "10px" }}>
        <a href="#" style={{ color: "#4f46e5", marginRight: "10px", textDecoration: "none" }}>
          Contact Us
        </a>
        <a href="#" style={{ color: "#4f46e5", marginRight: "10px", textDecoration: "none" }}>
          Terms & Conditions
        </a>
        <a href="#" style={{ color: "#4f46e5", textDecoration: "none" }}>
          Privacy Policy
        </a>
      </div>
    </div>
  </div>
)
