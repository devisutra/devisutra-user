import { Metadata } from "next";
import Image from "next/image";
import { Heart, Award, Leaf, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Devi Sutra | Handmade Elegance",
  description: "Learn about Devi Sutra's journey in creating premium handcrafted bags and traditional kurtis. Discover our story, values, and commitment to quality craftsmanship.",
  openGraph: {
    title: "About Devi Sutra",
    description: "Premium handmade bags and traditional kurtis. Handcrafted with love.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#F5F1EA] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-[#4A2F1B] mb-6">
              About Devi Sutra
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Where tradition meets elegance. Crafting beautiful, handmade products
              that celebrate Indian artistry and craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif text-[#4A2F1B] mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Devi Sutra was born from a passion for preserving traditional Indian
                craftsmanship while creating products that fit modern lifestyles. Each
                piece in our collection tells a story of skilled artisans who pour their
                hearts into every stitch and detail.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We believe that handmade products carry a unique warmth and character
                that mass-produced items can never replicate. Our mission is to bring
                these beautiful, sustainable, and ethically-made products to conscious
                consumers who value quality and authenticity.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every bag, every kurti, every accessory is crafted with love, attention
                to detail, and a commitment to excellence that has been passed down
                through generations of artisans.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800"
                alt="Handcrafted products"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-[#F5F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-[#4A2F1B] mb-12 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C2A14D] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-[#4A2F1B] mb-2">
                Handcrafted with Love
              </h3>
              <p className="text-gray-600 text-sm">
                Every product is made by skilled artisans who take pride in their craft.
              </p>
            </div>

            {/* Value 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C2A14D] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-[#4A2F1B] mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600 text-sm">
                We use only the finest materials and maintain strict quality standards.
              </p>
            </div>

            {/* Value 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C2A14D] rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-[#4A2F1B] mb-2">
                Sustainable
              </h3>
              <p className="text-gray-600 text-sm">
                Eco-friendly practices and materials that respect our planet.
              </p>
            </div>

            {/* Value 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C2A14D] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-[#4A2F1B] mb-2">
                Community First
              </h3>
              <p className="text-gray-600 text-sm">
                Supporting local artisans and empowering rural communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif text-[#4A2F1B] mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            To preserve and promote traditional Indian craftsmanship by creating
            beautiful, sustainable products that empower artisan communities while
            offering our customers authentic, high-quality handmade goods.
          </p>
          <div className="inline-block bg-[#C2A14D] text-white px-8 py-3 rounded-full font-medium">
            Handmade with ❤️ in India
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-[#4A2F1B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-sm text-gray-300">Artisans</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-sm text-gray-300">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-sm text-gray-300">Handmade</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
