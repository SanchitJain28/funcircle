import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const fakeProduct = [
      {
        id: "1",
        name: "Yonex Nanoray 18i Badminton Racket",
        price: 1499.0,
        image: "https://m.media-amazon.com/images/I/51nCaHKF8CL._AC_UL320_.jpg",
      },
      {
        id: "2",
        name: "Yonex Mavis 350 Nylon Shuttlecock (Pack of 6)",
        price: 2499.0,
        image: "https://m.media-amazon.com/images/I/71RDAP3v-rL._AC_UL320_.jpg",
      },
      {
        id: "3",
        name: "Yonex GR 303 Badminton Kit with Cover",
        price: 1770.0,
        image: "https://m.media-amazon.com/images/I/71snlkNDRBL._AC_UL320_.jpg",
      },
      {
        id: "4",
        name: "Yonex Nanoray 43i Badminton Racket",
        price: 1899.0,
        image: "https://m.media-amazon.com/images/I/51nCaHKF8CL._AC_UL320_.jpg",
      },
      {
        id: "5",
        name: "Yonex Mavis 350 Battle Shuttlecock (Pack of 6)",
        price: 2899.0,
        image: "https://m.media-amazon.com/images/I/71RDAP3v-rL._AC_UL320_.jpg",
      },
      {
        id: "6",
        name: "Yonex GR 603 Badminton Kit with Cover",
        price: 770.0,
        image: "https://m.media-amazon.com/images/I/71snlkNDRBL._AC_UL320_.jpg",
      },
    ];
    const filteredProduct = fakeProduct.filter((product)=>product.id === id)
    return NextResponse.json(filteredProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
