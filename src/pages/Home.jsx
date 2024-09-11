import { Link } from "react-router-dom";
import { useEffect, useState} from "react";
import Button from "../components/atoms/Button"
import { getProducts } from "../utils/api";
import Loading from "../components/organisms/Loading"; 

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(); // Fetch products from API
        console.log(response.data.results);
        setProducts(response.data.results); // Assuming response.data contains the array of products
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

    // Use the Loading component if the loading state is true
    if (loading) return <div className="flex justify-center items-center h-screen"><Loading /></div>;

    if (error) return <p>{error}</p>;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-6">
      {products.map((product) => (
        <Link
        key={product.id}
        to={`/product/${product.id}`}
          className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out"
          prefetch={false}
        >
          <div className="absolute inset-0 z-10">
            <span className="sr-only">View {product.name}</span>
          </div>
          <img
            src="/placeholder.svg"
            alt={product.name}
            width={400}
            height={300}
            className="object-cover w-full h-64"
            style={{ aspectRatio: "400/300", objectFit: "cover" }}
          />
          <div className="p-4 bg-background">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.description}</p>
            <div className="flex items-center justify-between mt-4">
              <h4 className="text-lg font-semibold">${product.price}</h4>
              <Button size="sm">Add to Cart</Button>
            </div>
          </div>
        </Link>
      ))}
    </section>
  )
}

export default Home;