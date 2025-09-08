import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("RUN ")
  try {
    const body = await req.json();
    const { origin, destinations, mode = "driving" } = body;

    // Validate required fields
    if (!origin?.lat || !origin?.lng) {
      return NextResponse.json(
        { error: "Missing origin coordinates" },
        { status: 400 }
      );
    }

    if (!destinations || !Array.isArray(destinations) || destinations.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid destinations array" },
        { status: 400 }
      );
    }

    // Validate each destination
    for (const dest of destinations) {
      if (!dest.lat || !dest.lng || !dest.id) {
        return NextResponse.json(
          { error: "Each destination must have lat, lng, and id" },
          { status: 400 }
        );
      }
    }

    const apiKey = process.env.GOOGLE_DISTANCE_MATRIX_API;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Google Maps API key not configured" },
        { status: 500 }
      );
    }

    // Construct destinations string for API
    const destinationsString = destinations
      .map(dest => `${dest.lat},${dest.lng}`)
      .join('|');

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destinationsString}&mode=${mode}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      return NextResponse.json(
        { error: "Distance Matrix API error", details: data },
        { status: 400 }
      );
    }

    // Process results and match with venue IDs
    const results = [];
    const elements = data.rows[0]?.elements || [];

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const destination = destinations[i];

      if (element.status === "OK") {
        results.push({
          venueId: destination.id,
          distance: element.distance.text,
          distanceValue: element.distance.value, // meters
          distanceKm: (element.distance.value / 1000).toFixed(1), // km with 1 decimal
          duration: element.duration.text,
          durationValue: element.duration.value, // seconds
        });
      } else {
        results.push({
          venueId: destination.id,
          distance: "N/A",
          distanceValue: null,
          distanceKm: "N/A",
          duration: "N/A",
          durationValue: null,
          error: element.status
        });
      }
    }


    return NextResponse.json({
      status: true,
      message: "Distances calculated successfully",
      data: results,
      code: "SUCCESS",
    });

  } catch (error) {
    console.error("Distance calculation error:", error);
    return NextResponse.json(
      {
        status: false,
        message: "INTERNAL_SERVER_ERROR",
        error: error instanceof Error ? error.message : "Unknown error",
        code: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}