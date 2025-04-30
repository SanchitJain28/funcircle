"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight, Menu, ShoppingBag, Star, Truck, Shield, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductProps, productData } from "@/Props/ProductData"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xl font-bold">ShopEase</span>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open Menu">
            <Menu className="h-6 w-6" />
          </Button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Shop
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Categories
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              New Arrivals
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="hidden sm:block text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Sign In
            </Link>
            <Button size="sm" className="px-3 sm:px-4">
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Cart</span> <span>(0)</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 md:py-12 lg:py-24 xl:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                    Discover Your Style, Elevate Your Life
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-sm sm:text-base md:text-xl">
                    Shop the latest trends with free shipping on orders over $50. Quality products for every lifestyle.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="w-full sm:w-auto px-4 sm:px-8">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto px-4 sm:px-8">
                    Explore Collections
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center mt-6 lg:mt-0">
                <img
                  src="https://superblog.supercdn.cloud/site_cuid_clr6oh1no0006rmr89yhkxgu8/images/image-41-3-1712752581555-compressed.png"
                  width={550}
                  height={550}
                  alt="Hero Product"
                  className="rounded-xl object-cover w-full max-w-[400px] lg:max-w-[550px]"
                  
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="w-full py-8 md:py-12 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Shop by Category</h2>
                <p className="max-w-[700px] text-muted-foreground text-sm sm:text-base md:text-xl">
                  Explore our wide range of products across popular categories
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-6 md:mt-8">
              {[
                { name: "Sport mats", image: "https://m.media-amazon.com/images/I/71b5fW+s18L.jpg" },
                { name: "Sport Equipments", image: "https://5.imimg.com/data5/GR/QO/SB/SELLER-90332295/jumping-skipping-ropes-500x500.jpg" },
                { name: "Exercise equipments", image: "https://5.imimg.com/data5/EN/JN/EN/SELLER-14508282/ab-rollers-500x500.jpeg" }
              ].map((category) => (
                <Link
                  key={category.name}
                  href="#"
                  className="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
                >
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    
                    className="aspect-square object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 w-full p-3 sm:p-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white">{category.name}</h3>
                    <div className="mt-1 sm:mt-2 flex items-center text-white">
                      <span className="text-xs sm:text-sm">Shop Now</span>
                      <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="w-full py-8 md:py-12 lg:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Featured Products</h2>
                <p className="max-w-[700px] text-muted-foreground text-sm sm:text-base md:text-xl">
                  Discover our handpicked selection of trending products
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-6 md:mt-8">
              {productData.map((product:ProductProps) => (
                <div
                  key={product.title}
                  className="group relative overflow-hidden rounded-lg border bg-background p-2 transition-colors hover:bg-muted/50"
                  onClick={()=>router.push(`/product?id=${product.id}`)}
                >
                  <div className="relative aspect-square overflow-hidden rounded-md">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={400}
                      height={400}
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute right-2 top-2">
                      <Button size="icon" variant="secondary" className="rounded-full h-8 w-8">
                        <ShoppingBag className="h-4 w-4" />
                        <span className="sr-only">Add to cart</span>
                      </Button>
                    </div>
                  </div>
                  <div className="pt-3">
                    <h3 className="font-medium text-sm sm:text-base line-clamp-1">{product.title}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-primary text-primary" />
                        <span className="text-xs sm:text-sm ml-1">{4}</span>
                      </div>
                      <div className="font-medium text-sm sm:text-base">{product.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6 sm:mt-8 md:mt-10">
              <Button size="lg" className="w-full sm:w-auto max-w-xs">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-8 md:py-12 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-3 sm:space-y-4 text-center">
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold">Free Shipping</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Enjoy free shipping on all orders over $50. Fast delivery to your doorstep.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-3 sm:space-y-4 text-center">
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold">Secure Payment</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    All transactions are secure and encrypted. Shop with confidence.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-3 sm:space-y-4 text-center sm:col-span-2 lg:col-span-1">
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10">
                  <RotateCcw className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold">Easy Returns</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    30-day return policy. Not satisfied? Return it for free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-8 md:py-12 lg:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">What Our Customers Say</h2>
                <p className="max-w-[700px] text-muted-foreground text-sm sm:text-base md:text-xl">
                  Don&apos;t just take our word for it. Here&apos;s what our customers have to say.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 md:mt-8">
              {[
                {
                  name: "Sarah Johnson",
                  comment:
                    "The quality of the products exceeded my expectations. Fast shipping and excellent customer service!",
                  avatar: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "Michael Chen",
                  comment:
                    "I've been shopping here for years and have never been disappointed. Great selection and prices.",
                  avatar: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "Emily Rodriguez",
                  comment:
                    "The return process was so easy when I needed to exchange a size. Will definitely shop here again!",
                  avatar: "/placeholder.svg?height=80&width=80",
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="flex flex-col items-center space-y-3 sm:space-y-4 rounded-lg bg-background p-4 sm:p-6 shadow-sm"
                >
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full w-12 h-12 sm:w-16 sm:h-16"
                  />
                  <div className="flex space-x-1">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-primary text-primary" />
                      ))}
                  </div>
                  <p className="text-center text-xs sm:text-sm text-muted-foreground">&apos;{testimonial.comment}&apos;</p>
                  <h4 className="font-semibold text-sm sm:text-base">{testimonial.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="w-full py-8 md:py-12 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Stay Updated</h2>
                <p className="max-w-[600px] text-muted-foreground text-sm sm:text-base md:text-xl">
                  Subscribe to our newsletter for exclusive offers, new arrivals, and more.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" required />
                  <Button type="submit" className="w-full sm:w-auto">
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
            <p className="text-center text-xs sm:text-sm leading-loose md:text-left">
              &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-xs sm:text-sm font-medium">
              Terms
            </Link>
            <Link href="#" className="text-xs sm:text-sm font-medium">
              Privacy
            </Link>
            <Link href="#" className="text-xs sm:text-sm font-medium">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
