import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      origin = {
        lat: 28.658175810566227,
        lng: 77.29002969999999,
      },
      mode = "driving",
    } = await request.json();

    if (!origin?.lat || !origin?.lng) {
      return NextResponse.json(
        { error: "Missing origin coordinates" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_DISTANCE_MATRIX_API;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Google Maps API key not configured" },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from("venues")
      .select(
        "id,venue_name,images,maps_link,description,location,lat,lng,group_id"
      );

    if (!data || data.length === 0) {
      return NextResponse.json(
        {
          status: false,
          message: "No venues was found",
          error,
          code: "NO_DATA_FOUND",
        },
        { status: 400 }
      );
    }

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Internal Server Error Occurred!!",
          error,
          code: "INTERNAL_SERVER_ERROR",
        },
        { status: 500 }
      );
    }
    const destinations = data.map((venue) => ({
      id: venue.id,
      lat: venue.lat,
      lng: venue.lng,
    }));

    const destinationsString = destinations
      .map((dest) => `${dest.lat},${dest.lng}`)
      .join("|");
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destinationsString}&mode=${mode}&key=${apiKey}`;

    const response = await fetch(url);
    const distanceData = await response.json();

    if (distanceData.status !== "OK") {
      return NextResponse.json(
        { error: "Distance Matrix API error", details: data },
        { status: 400 }
      );
    }

    const results = [];
    const elements = distanceData.rows[0]?.elements || [];

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const destination = destinations[i];

      const venue= data.find((venue) => venue.id === destination.id)

      if (element.status === "OK") {
        results.push({
          ...venue,
          distance: element.distance.text,
          distanceValue: element.distance.value, // meters
          distanceKm: (element.distance.value / 1000).toFixed(1), // km with 1 decimal
          duration: element.duration.text,
          durationValue: element.duration.value, // seconds
        });
      } else {
        results.push({
          ...venue,
          distance: "N/A",
          distanceValue: null,
          distanceKm: "N/A",
          duration: "N/A",
          durationValue: null,
          error: element.status,
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
