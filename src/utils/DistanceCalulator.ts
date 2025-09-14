interface Venue {
  id: number;
  venue_name: string;
  location: string;
  lat: number;
  lng: number;
  description: string;
  images: string[];
}
interface VenueWithDistance extends Venue {
  distance: number;
}

export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // km
}


export function findNearestVenue(userLat: number, userLng: number, venues: Venue[]): VenueWithDistance | null {
  return venues.reduce<VenueWithDistance | null>((nearest, venue) => {
    const dist = getDistance(userLat, userLng, venue.lat, venue.lng);

    console.log(dist)


    if (!nearest || dist < nearest.distance) {
      return { ...venue, distance: dist };
    }

    console.log(nearest)


    return nearest;
  }, null);
}
