import MapPage from "./map";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        {children}
        <MapPage />
      </main>
      <Footer />
    </>
  );
}
