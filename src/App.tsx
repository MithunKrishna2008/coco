import React, { useState } from 'react';
import { Phone, Mail, MapPin, Star, ShoppingCart, Leaf, Award, Users, Check } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  features: string[];
}

interface CartItem extends Product {
  quantity: number;
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "Fresh Green Coconuts",
      price: 25,
      originalPrice: 35,
      image: "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Young, tender coconuts perfect for drinking fresh coconut water",
      features: ["High in electrolytes", "Natural hydration", "Fresh daily harvest"]
    },
    {
      id: 2,
      name: "Mature Brown Coconuts",
      price: 20,
      image: "https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Fully matured coconuts with rich meat, perfect for cooking",
      features: ["Rich coconut meat", "Premium quality", "Ideal for cooking"]
    },
    {
      id: 3,
      name: "Coconut Water Bottles",
      price: 45,
      originalPrice: 55,
      image: "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Pure coconut water extracted fresh and bottled hygienically",
      features: ["100% natural", "No preservatives", "Ready to drink"]
    },
    {
      id: 4,
      name: "Coconut Oil (1L)",
      price: 180,
      image: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=800",
      description: "Premium cold-pressed virgin coconut oil",
      features: ["Cold-pressed", "Virgin quality", "Health benefits"]
    },
    {
      id: 5,
      name: "Dried Coconut Flakes",
      price: 120,
      image: "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Naturally dried coconut flakes for baking and cooking",
      features: ["No artificial additives", "Long shelf life", "Perfect for baking"]
    },
    {
      id: 6,
      name: "Coconut Bundle (12 pcs)",
      price: 240,
      originalPrice: 300,
      image: "https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Bulk pack of fresh coconuts at wholesale prices",
      features: ["Wholesale price", "Farm fresh", "Best value"]
    }
  ];

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Leaf className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-800">Mithun Krishna Coco</h1>
            </div>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">₹{item.price} × {item.quantity}</p>
                      </div>
                      <p className="font-bold">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  <button className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 hover:bg-green-700 transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Mithun Krishna Coco
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Premium Quality Coconuts & Coconut Products
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto opacity-90">
              Farm-fresh coconuts delivered directly from our plantations. 
              Experience the pure taste of nature with our premium coconut products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
                Shop Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-600 transition-all transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Years of Excellence</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">Natural Products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Premium Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our range of fresh coconuts and coconut products, 
              sourced directly from our organic plantations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Save ₹{product.originalPrice - product.price}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="mb-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About Mithun Krishna Coco
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                With over 15 years of experience in coconut cultivation and processing, 
                Mithun Krishna Coco has become a trusted name in providing premium quality 
                coconuts and coconut products.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our commitment to quality begins at our organic plantations where we 
                nurture each coconut tree with care, ensuring that every product meets 
                the highest standards of freshness and purity.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-lg">100% Organic & Natural</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-lg">Direct from Farm</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-lg">Quality Guaranteed</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-lg">Fast Delivery</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Coconut plantation"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-green-600 text-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold">15+</h3>
                <p>Years of Trust</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai",
                text: "The freshest coconuts I've ever tasted! The quality is consistently excellent and delivery is always on time.",
                rating: 5
              },
              {
                name: "Rajesh Kumar",
                location: "Bangalore",
                text: "Amazing coconut oil quality. My family has been using Mithun Krishna Coco products for 3 years now.",
                rating: 5
              },
              {
                name: "Sunita Patel",
                location: "Chennai",
                text: "Best prices in the market with premium quality. Highly recommend for all coconut needs!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h2>
            <p className="text-xl opacity-90">
              Ready to order? Have questions? We're here to help!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="opacity-90">+91 98765 43210</p>
              <p className="opacity-90">+91 87654 32109</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="opacity-90">orders@mithunkrishnacoco.com</p>
              <p className="opacity-90">info@mithunkrishnacoco.com</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Visit Us</h3>
              <p className="opacity-90">Coconut Plantation Road</p>
              <p className="opacity-90">Kerala, India - 686574</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
              Place Your Order Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Leaf className="h-8 w-8 text-green-500" />
              <h3 className="text-2xl font-bold">Mithun Krishna Coco</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Premium quality coconuts and coconut products from our organic plantations
            </p>
            <p className="text-gray-500">
              © 2024 Mithun Krishna Coco. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;