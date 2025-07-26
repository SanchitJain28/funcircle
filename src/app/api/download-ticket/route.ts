import type { NextRequest } from "next/server";
import puppeteer from "puppeteer-core";
import QRCode from "qrcode";
import chromium from "@sparticuz/chromium";

export async function POST(request: NextRequest) {
  const { ticketData } = await request.json();

  const viewport = {
    deviceScaleFactor: 1,
    hasTouch: false,
    height: 1080,
    isLandscape: true,
    isMobile: false,
    width: 1920,
  };
  const browser = await puppeteer.launch({
    args: puppeteer.defaultArgs({ args: chromium.args, headless: "shell" }),
    defaultViewport: viewport,
    executablePath: await chromium.executablePath(),
    headless: "shell",
  });

  const page = await browser.newPage();

  const qrValue = ticketData.mapsLink || `Ticket ID: ${ticketData.ticketId}`;
  let qrCodeDataURL = "";

  try {
    qrCodeDataURL = await QRCode.toDataURL(qrValue, {
      width: 80,
      margin: 0,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    });
  } catch (err) {
    console.error("QR Code generation failed:", err);
    // Fallback to placeholder if QR generation fails
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            padding: 20px;
            color: #1e293b;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .ticket {
            background: white;
            width: 100%;
            max-width: 800px;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            position: relative;
          }
          
          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(12deg);
            font-size: 120px;
            color: rgba(148, 163, 184, 0.03);
            font-weight: 900;
            z-index: 1;
            pointer-events: none;
            letter-spacing: 8px;
          }
          
          .ticket-header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            padding: 32px;
            text-align: center;
            position: relative;
            z-index: 10;
          }
          
          .ticket-header::after {
            content: '';
            position: absolute;
            bottom: -12px;
            left: 0;
            right: 0;
            height: 24px;
            background-image: radial-gradient(circle at 12px, transparent 12px, white 12px);
            background-size: 24px 24px;
          }
          
          .event-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 8px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            letter-spacing: -0.5px;
          }
          
          .ticket-type {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 500;
            letter-spacing: 2px;
            text-transform: uppercase;
          }
          
          .ticket-body {
            padding: 32px;
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 32px;
            position: relative;
            z-index: 10;
          }
          
          .left-section {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          
          .right-section {
            border-left: 2px dashed #e2e8f0;
            padding-left: 32px;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          
          .venue-section {
            background: #f8fafc;
            padding: 20px;
            border-radius: 12px;
            border-left: 4px solid #4f46e5;
          }
          
          .venue-title {
            font-size: 20px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
          }
          
          .venue-title::before {
            content: '📍';
            margin-right: 8px;
            font-size: 16px;
          }
          
          .venue-location {
            color: #64748b;
            font-size: 14px;
            margin-bottom: 8px;
            line-height: 1.5;
          }
          
          .maps-link {
            color: #4f46e5;
            text-decoration: none;
            font-size: 13px;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            transition: color 0.2s;
          }
          
          .maps-link:hover {
            color: #3730a3;
          }
          
          .event-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          
          .detail-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
          }
          
          .detail-label {
            font-size: 11px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
            margin-bottom: 4px;
          }
          
          .detail-value {
            font-size: 15px;
            color: #1e293b;
            font-weight: 600;
          }
          
          .ticket-id-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
            grid-column: 1 / -1;
          }
          
          .ticket-id-value {
            font-family: 'Courier New', monospace;
            font-size: 15px;
            color: #1e293b;
            font-weight: 600;
          }
          
          .description {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #10b981;
          }
          
          .description-title {
            font-weight: 600;
            margin-bottom: 8px;
            color: #1e293b;
            font-size: 14px;
          }
          
          .description-text {
            color: #64748b;
            line-height: 1.6;
            font-size: 13px;
          }
          
          .qr-section {
            background: #f8fafc;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
          }
          
          .qr-placeholder {
            width: 100px;
            height: 100px;
            background: white;
            border: 2px dashed #cbd5e1;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0 auto 12px;
            position: relative;
          }
          
          .qr-placeholder::before {
            content: '⚡';
            font-size: 24px;
            margin-bottom: 4px;
          }
          
          .qr-text {
            font-size: 11px;
            color: #64748b;
            font-weight: 500;
          }
          
          .qr-instruction {
            font-size: 12px;
            color: #64748b;
            margin-top: 8px;
          }
          
          .order-details {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
          }
          
          .order-title {
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 16px;
            color: #1e293b;
          }
          
          .order-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #f1f5f9;
          }
          
          .order-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          
          .order-label {
            font-size: 12px;
            color: #64748b;
            font-weight: 500;
          }
          
          .order-value {
            font-size: 13px;
            color: #1e293b;
            font-weight: 600;
          }
          
          .order-value.mono {
            font-family: 'Courier New', monospace;
          }
          
          .price-info {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
          }
          
          .total-price {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 4px;
            letter-spacing: -1px;
          }
          
          .price-details {
            font-size: 13px;
            opacity: 0.9;
            font-weight: 500;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          
          .footer {
            background: #f8fafc;
            padding: 20px 32px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
          }
          
          .footer-info {
            font-size: 11px;
            color: #64748b;
            line-height: 1.5;
          }
          
          .footer-info p {
            margin-bottom: 4px;
          }
          
          .footer-info p:last-child {
            margin-bottom: 0;
          }
          
          .footer-brand {
            font-size: 10px;
            color: #94a3b8;
            font-weight: 500;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          
          @media print {
            body {
              background: white;
              padding: 0;
            }
            
            .ticket {
              box-shadow: none;
              max-width: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="ticket">
          <div class="watermark">TICKET</div>
          
          <div class="ticket-header">
            <div class="event-title">${ticketData.eventName}</div>
            <div class="ticket-type">${ticketData.ticketType} •  Ticket</div>
          </div>
          
          <div class="ticket-body">
            <div class="left-section">
              <div class="venue-section">
                <div class="venue-title">${ticketData.venueName}</div>
                <div class="venue-location">${ticketData.location}</div>
                ${ticketData.mapsLink ? `<a href="${ticketData.mapsLink}" class="maps-link">View on Maps →</a>` : ""}
              </div>
              
              <div class="event-details">
                <div class="detail-card">
                  <div class="detail-label">Date</div>
                  <div class="detail-value">${ticketData.date}</div>
                </div>
                <div class="detail-card">
                  <div class="detail-label">Time</div>
                  <div class="detail-value">${ticketData.startTime} - ${ticketData.endTime}</div>
                </div>
                <div class="ticket-id-card">
                  <div class="detail-label">Ticket ID</div>
                  <div class="detail-value ticket-id-value">#${ticketData.ticketId}</div>
                </div>
              </div>
              
              ${
                ticketData.description &&
                ticketData.description !== "No description available"
                  ? `
              <div class="description">
                <div class="description-title">Event Description</div>
                <div class="description-text">${ticketData.description}</div>
              </div>
              `
                  : ""
              }
            </div>
            
            <div class="right-section">
              <div class="qr-section">
                <div class="qr-placeholder">
                  <div class="qr-text">${
                    qrCodeDataURL
                      ? `
                <div style="text-align: center; margin: 15px 0;">
                  <img src="${qrCodeDataURL}" style="width: 80px; height: 80px; border-radius: 8px; border: 2px solid #ddd;" alt="QR Code" />
                  <div style="font-size: 10px; color: #999; margin-top: 5px;">
                    ${ticketData.mapsLink ? "Venue Location" : "Ticket Info"}
                  </div>
                </div>
              `
                      : `
                <div class="qr-placeholder">
                  QR Code
                  <br>
                  (Generation Failed)
                </div>
              `
                  }</div>
                </div>
              </div>
              
              <div class="order-details">
                <div class="order-title">Order Summary</div>
                <div class="order-row">
                  <div class="order-label">Order ID</div>
                  <div class="order-value mono">#${ticketData.orderId}</div>
                </div>
                <div class="order-row">
                  <div class="order-label">Quantity</div>
                  <div class="order-value">${ticketData.quantity} ticket(s)</div>
                </div>
                <div class="order-row">
                  <div class="order-label">Price per ticket</div>
                  <div class="order-value">₹${ticketData.price}</div>
                </div>
                <div class="order-row">
                  <div class="order-label">Booked on</div>
                  <div class="order-value">${ticketData.createdAt}</div>
                </div>
              </div>
              
              <div class="price-info">
                <div class="total-price">₹${ticketData.price * ticketData.quantity}</div>
                <div class="price-details">Total Amount Paid</div>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div class="footer-info">
              <p>📧 Support: +919561079271</p>
            </div>
            <div class="footer-brand">Powered by Fun Circle</div>
          </div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(html);

  // Set PDF options for single page
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "0.3in",
      right: "0.3in",
      bottom: "0.3in",
      left: "0.3in",
    },
    preferCSSPageSize: true,
  });

  await browser.close();

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="ticket-${ticketData.eventName.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf"`,
    },
  });
}
